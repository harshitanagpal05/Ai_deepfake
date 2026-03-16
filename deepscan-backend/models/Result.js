const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  final_score: {
    type: Number,
    required: true
  },
  verdict: {
    type: String,
    enum: ['REAL', 'UNCERTAIN', 'LIKELY SYNTHETIC', 'SYNTHETIC'],
    required: true
  },
  confidence: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  breakdown: {
    model_score: Number,
    artifact_score: Number,
    metadata_score: Number
  },
  flags: [String],
  raw_metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  analyzed_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', ResultSchema);