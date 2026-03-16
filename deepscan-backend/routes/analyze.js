const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const upload = require('../middleware/fileValidator');
const { analyzeMetadata } = require('../services/metadataService');
const { runMLModel } = require('../services/mlService');
const { aggregateScores } = require('../services/scoreAggregator');
const Result = require('../models/Result'); // ← ADDED

router.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    console.log('File received:', req.file.filename);

    // Run both in parallel
    const [metadataResult, mlResult] = await Promise.all([
      analyzeMetadata(req.file.path),
      runMLModel(req.file.path)
    ]);

    // Aggregate scores
    const result = aggregateScores(
      metadataResult.metadata_score,
      mlResult.model_score,
      mlResult.artifact_score
    );

    // Save to MongoDB ← ADDED
    const savedResult = await Result.create({
      filename: req.file.filename,
      final_score: result.final_score,
      verdict: result.verdict,
      confidence: result.confidence,
      breakdown: result.breakdown,
      flags: metadataResult.flags,
      raw_metadata: metadataResult.raw
    });

    console.log('Saved to DB:', savedResult._id);

    // Delete temp file after analysis ← ADDED
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Failed to delete temp file:', err.message);
      else console.log('Temp file deleted ✅');
    });

    res.json({
      message: '✅ Analysis complete',
      id: savedResult._id,
      filename: req.file.filename,
      final_score: result.final_score,
      verdict: result.verdict,
      confidence: result.confidence,
      breakdown: result.breakdown,
      flags: metadataResult.flags,
      raw_metadata: metadataResult.raw,
      analyzed_at: savedResult.analyzed_at
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET — fetch all past results ← ADDED
router.get('/results', async (req, res) => {
  try {
    const results = await Result.find()
      .sort({ analyzed_at: -1 }) // newest first
      .limit(20);

    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch results' });
  }
});

// Handle multer errors
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: '❌ File too large. Max size is 5MB' });
    }
  }
  res.status(400).json({ error: err.message });
});

module.exports = router;