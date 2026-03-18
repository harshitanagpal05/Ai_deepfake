const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const { upload, handleMulterError } = require('../middleware/fileValidator');
const { analyzeMetadata } = require('../services/metadataService');
const { runMLModel } = require('../services/mlService');
const { aggregateScores } = require('../services/scoreAggregator');
const Result = require('../models/Result');

// ─── POST /api/analyze ─────────────────────────────────────────────────────
router.post('/analyze', upload.single('image'), async (req, res, next) => {
  // Guard: ensure a file was actually uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }

  const filePath = req.file.path;

  try {
    console.log('📂 File received:', req.file.filename);

    // Run metadata + ML analysis in parallel
    const [metadataResult, mlResult] = await Promise.all([
      analyzeMetadata(filePath),
      runMLModel(filePath)
    ]);

    // Aggregate into final verdict
    const result = aggregateScores(
      metadataResult.metadata_score,
      mlResult.model_score,
      mlResult.artifact_score
    );

    // Persist result to MongoDB
    const savedResult = await Result.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      final_score: result.final_score,
      verdict: result.verdict,
      confidence: result.confidence,
      breakdown: result.breakdown,
      flags: metadataResult.flags,
      raw_metadata: metadataResult.raw
    });

    console.log('💾 Saved to DB:', savedResult._id);

    // Delete temp upload file asynchronously (non-blocking)
    fs.unlink(filePath)
      .then(() => console.log('🗑️  Temp file deleted'))
      .catch((e) => console.warn('⚠️  Could not delete temp file:', e.message));

    return res.status(200).json({
      message: 'Analysis complete',
      id: savedResult._id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      final_score: result.final_score,
      verdict: result.verdict,
      confidence: result.confidence,
      breakdown: result.breakdown,
      flags: metadataResult.flags,
      raw_metadata: metadataResult.raw,
      analyzed_at: savedResult.analyzed_at
    });

  } catch (err) {
    // Attempt cleanup on error
    fs.unlink(filePath).catch(() => { });
    console.error('❌ Analysis error:', err.message);
    return res.status(503).json({ error: 'Analysis service failed. Please try again.' });
  }
});

// ─── GET /api/results ──────────────────────────────────────────────────────
// Supports ?page=1&limit=20 for pagination
router.get('/results', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
      Result.find()
        .sort({ analyzed_at: -1 })
        .skip(skip)
        .limit(limit)
        .select('-raw_metadata'), // exclude heavy field from list
      Result.countDocuments()
    ]);

    return res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      results
    });
  } catch (err) {
    console.error('❌ Fetch results error:', err.message);
    return res.status(500).json({ error: 'Could not fetch results.' });
  }
});

// ─── GET /api/results/:id ──────────────────────────────────────────────────
router.get('/results/:id', async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Result not found.' });
    }
    return res.json(result);
  } catch (err) {
    // Invalid ObjectId format
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid result ID format.' });
    }
    console.error('❌ Fetch result error:', err.message);
    return res.status(500).json({ error: 'Could not fetch result.' });
  }
});

// ─── Multer Error Handler (must be last) ───────────────────────────────────
router.use(handleMulterError);

module.exports = router;