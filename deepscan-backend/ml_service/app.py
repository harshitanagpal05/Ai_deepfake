import os
import cv2
import numpy as np
from flask import Flask, request, jsonify
import tensorflow as tf

app = Flask(__name__)

# Model paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGE_MODEL_PATH = os.path.join(BASE_DIR, 'trained_models', 'image_prediction_model', 'model_cp (1).h5')
VIDEO_MODEL_PATH = os.path.join(BASE_DIR, 'trained_models', 'video_prediction_model', 'best_model.keras')

# Set environment paths for tensorflow
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

# Load models safely
def safe_load_model(path):
    try:
        if os.path.exists(path):
            print(f"Loading model: {path}")
            model = tf.keras.models.load_model(path, compile=False)
            return model
        else:
            print(f"Model path not found: {path}")
            return None
    except Exception as e:
        print(f"Error loading model {path}: {e}")
        return None

image_model = safe_load_model(IMAGE_MODEL_PATH)
video_model = safe_load_model(VIDEO_MODEL_PATH)

def get_target_size(model, default_size=(256, 256)):
    try:
        shape = model.input_shape
        # standard vision models: (None, H, W, 3)
        if shape and len(shape) >= 3:
            target_h = shape[1] if shape[1] is not None else default_size[0]
            target_w = shape[2] if shape[2] is not None else default_size[1]
            # Some models might have channels first (None, 3, H, W)
            if target_h == 3 and target_w is not None and shape[3] is not None:
                return (shape[3], shape[2])
            return (target_w, target_h)
    except:
        pass
    return default_size

def preprocess_image(filepath, target_size=(256, 256)):
    img = cv2.imread(filepath)
    if img is None:
        return None
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, target_size)
    img = img / 255.0
    img = np.expand_dims(img, axis=0) # Add batch dimension
    return img

def predict_score(model, data):
    pred = model.predict(data)
    # Attempt to parse score logic (usually 0 is real, 1 is fake, or vice versa)
    print("Raw prediction output:", pred)
    score = float(pred[0][0]) * 100 if pred.shape[-1] == 1 else float(np.argmax(pred[0])) * 100
    return max(0, min(100, score))

@app.route('/predict-image', methods=['POST'])
def predict_image():
    if image_model is None:
        return jsonify({"status": "error", "error": "Image model not loaded. Check server logs."})
    
    data = request.json
    filepath = data.get('filepath')
    
    if not filepath or not os.path.exists(filepath):
        return jsonify({"status": "error", "error": f"File not found: {filepath}"})

    target_size = get_target_size(image_model, (256, 256))
    img_data = preprocess_image(filepath, target_size)
    
    if img_data is None:
        return jsonify({"status": "error", "error": "Failed to process image with openCV."})
    
    try:
        score = predict_score(image_model, img_data)
        return jsonify({
            "status": "success",
            "model_score": score,
            "artifact_score": score
        })
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)})

@app.route('/predict-video', methods=['POST'])
def predict_video():
    if video_model is None:
        return jsonify({"status": "error", "error": "Video model not loaded. Check server logs."})
    
    data = request.json
    filepath = data.get('filepath')
    
    if not filepath or not os.path.exists(filepath):
        return jsonify({"status": "error", "error": f"File not found: {filepath}"})

    target_size = get_target_size(video_model, (256, 256))
    
    try:
        cap = cv2.VideoCapture(filepath)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        if total_frames <= 0:
            return jsonify({"status": "error", "error": "Could not read frames from video."})
            
        # Extract middle frame
        cap.set(cv2.CAP_PROP_POS_FRAMES, total_frames // 2)
        ret, frame = cap.read()
        cap.release()
        
        if not ret:
             return jsonify({"status": "error", "error": "Could not extract frame from video."})
             
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = cv2.resize(frame, target_size)
        frame = frame / 255.0
        frame_data = np.expand_dims(frame, axis=0)

        # Ensure the video model doesn't expect a sequence (e.g. None, sequence_length, H, W, 3)
        input_shape_len = len(video_model.input_shape) if video_model.input_shape else 4
        if input_shape_len == 5:
            # Wrap in another dimension (Batch, Frames, H, W, C)
            frame_data = np.expand_dims(frame_data, axis=0)
            
        score = predict_score(video_model, frame_data)
        
        return jsonify({
            "status": "success",
            "model_score": score,
            "artifact_score": score
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"status": "error", "error": str(e)})

if __name__ == '__main__':
    print("🚀 Starting Flask ML API on port 5001...")
    # Bind to 0.0.0.0 so Docker containers can reach it
    app.run(host='0.0.0.0', port=5001, debug=False)
