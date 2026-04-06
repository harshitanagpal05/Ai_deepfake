import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export async function analyzeImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(`${API_BASE_URL}/api/analyze`, formData);
  return response.data;
}

export async function analyzeVideo(file) {
  const formData = new FormData();
  formData.append('video', file);

  const response = await axios.post(`${API_BASE_URL}/api/analyze-video`, formData);
  return response.data;
}

export async function analyzeMedia(file) {
  const isVideo = file && file.type.startsWith('video/');
  if (isVideo) {
    return analyzeVideo(file);
  }
  return analyzeImage(file);
}