const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ─── Security & Logging ────────────────────────────────────────────────────
app.use(helmet());
app.use(morgan('dev'));

// ─── CORS ──────────────────────────────────────────────────────────────────
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: allowedOrigin }));

// ─── Body Parsers ──────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Rate Limiting ─────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' }
});
app.use('/api', apiLimiter);

// ─── MongoDB Connection ────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// ─── Routes ────────────────────────────────────────────────────────────────
const analyzeRoute = require('./routes/analyze');
app.use('/api', analyzeRoute);

// ─── Health Check ──────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'DeepScan Backend Running 🚀', timestamp: new Date().toISOString() });
});

// ─── 404 Handler ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Global Error Handler ──────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

// ─── Start Server ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ─── Graceful Shutdown ─────────────────────────────────────────────────────
const shutdown = async (signal) => {
  console.log(`\n🛑 ${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed. Exiting.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));