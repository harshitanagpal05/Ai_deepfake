const express = require('express');
const router = express.Router();
const multer = require('multer');          // ← ADD THIS LINE
const upload = require('../middleware/fileValidator');

router.post('/analyze', upload.single('image'), (req, res) => {
  console.log('File received:', req.file);

  res.json({
    message: '✅ File uploaded successfully',
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
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