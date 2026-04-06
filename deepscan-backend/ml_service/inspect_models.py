import tensorflow as tf
import os

print("TensorFlow version:", tf.__version__)

base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
image_model_path = os.path.join(base_path, 'trained_models', 'image_prediction_model', 'model_cp (1).h5')
video_model_path = os.path.join(base_path, 'trained_models', 'video_prediction_model', 'best_model.keras')

print("\n=== Inspecting Image Model ===")
try:
    img_model = tf.keras.models.load_model(image_model_path, compile=False)
    print("Image Model Input Shape:", img_model.input_shape)
    print("Image Model Output Shape:", img_model.output_shape)
    img_model.summary()
except Exception as e:
    print("Error loading image model:", e)

print("\n=== Inspecting Video Model ===")
try:
    vid_model = tf.keras.models.load_model(video_model_path, compile=False)
    print("Video Model Input Shape:", vid_model.input_shape)
    print("Video Model Output Shape:", vid_model.output_shape)
    vid_model.summary()
except Exception as e:
    print("Error loading video model:", e)
