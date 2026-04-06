const axios = require('axios');

const FLASK_URL = process.env.FLASK_ML_URL || 'http://localhost:5001';

// ─── Image Analysis via Python Microservice ────────────────────────────────
const runImageMLModel = async (imagePath) => {
    try {
        const response = await axios.post(`${FLASK_URL}/predict-image`, {
            filepath: imagePath
        });

        if (response.data.status === 'success') {
            return {
                model_score: response.data.model_score,
                artifact_score: response.data.artifact_score,
                status: 'success'
            };
        } else {
            throw new Error(response.data.error || 'Python service returned an error');
        }
    } catch (err) {
        console.error('❌ ML Service Image Error:', err.message);
        return {
            model_score: 50,
            artifact_score: 50,
            status: 'error'
        };
    }
};

// ─── Video Analysis via Python Microservice ────────────────────────────────
const runVideoMLModel = async (videoPath) => {
    try {
        const response = await axios.post(`${FLASK_URL}/predict-video`, {
            filepath: videoPath
        });

        if (response.data.status === 'success') {
            return {
                model_score: response.data.model_score,
                artifact_score: response.data.artifact_score,
                status: 'success'
            };
        } else {
            throw new Error(response.data.error || 'Python service returned an error');
        }
    } catch (err) {
        console.error('❌ ML Service Video Error:', err.message);
        return {
            model_score: 50,
            artifact_score: 50,
            status: 'error'
        };
    }
};

module.exports = { runImageMLModel, runVideoMLModel };
