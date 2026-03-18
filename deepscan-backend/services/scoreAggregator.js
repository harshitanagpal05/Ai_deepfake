// ─── Verdict Lookup ───────────────────────────────────────────────────────

/**
 * Maps a final numeric score (0–100) to a human-readable verdict and
 * confidence level.
 * @param {number} score
 * @returns {{ verdict: string, confidence: string }}
 */
const getVerdict = (score) => {
  if (score >= 70) return { verdict: 'SYNTHETIC', confidence: 'High' };
  if (score >= 50) return { verdict: 'LIKELY SYNTHETIC', confidence: 'Medium' };
  if (score >= 35) return { verdict: 'UNCERTAIN', confidence: 'Low' };
  return { verdict: 'REAL', confidence: 'High' };
};

// ─── Score Aggregator ─────────────────────────────────────────────────────

/**
 * Combines the three analysis scores into a single weighted final score.
 *
 * Weights:
 *   model    → 50%  (most reliable, pixel-level analysis)
 *   artifact → 30%  (structural artifact detection)
 *   metadata → 20%  (EXIF signals)
 *
 * @param {number} metadataScore
 * @param {number} modelScore
 * @param {number} artifactScore
 */
const aggregateScores = (metadataScore, modelScore, artifactScore) => {
  // Validate inputs — fall back to neutral 50 if non-numeric values arrive
  const safe = (v) => (Number.isFinite(v) ? v : 50);
  const ms = safe(metadataScore);
  const ls = safe(modelScore);
  const as = safe(artifactScore);

  const weights = { model: 0.5, artifact: 0.3, metadata: 0.2 };

  const finalScore = Math.round(
    ls * weights.model +
    as * weights.artifact +
    ms * weights.metadata
  );

  const { verdict, confidence } = getVerdict(finalScore);

  return {
    final_score: finalScore,
    verdict,
    confidence,
    breakdown: {
      model_score: ls,
      artifact_score: as,
      metadata_score: ms
    }
  };
};

module.exports = { aggregateScores };