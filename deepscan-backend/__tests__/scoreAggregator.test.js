/**
 * DeepScan Backend — Health Check Tests
 *
 * Minimal smoke tests that verify the server can start and respond.
 * These run in CI without MongoDB, so they only test the health endpoint.
 *
 * To add more tests:
 *   - Create files matching __tests__/*.test.js
 *   - Jest will auto-discover them
 */

const { aggregateScores } = require('../services/scoreAggregator');

// ─── Unit Tests (no server needed) ─────────────────────────────────────────

describe('Score Aggregator', () => {
  test('should return SYNTHETIC for high scores', () => {
    const result = aggregateScores(90, 90, 90);
    expect(result.verdict).toBe('SYNTHETIC');
    expect(result.confidence).toBe('High');
    expect(result.final_score).toBe(90);
  });

  test('should return REAL for low scores', () => {
    const result = aggregateScores(10, 10, 10);
    expect(result.verdict).toBe('REAL');
    expect(result.confidence).toBe('High');
    expect(result.final_score).toBe(10);
  });

  test('should handle neutral scores', () => {
    const result = aggregateScores(50, 50, 50);
    expect(result.verdict).toBe('LIKELY SYNTHETIC');
    expect(result.final_score).toBe(50);
  });

  test('should apply correct weights (model=50%, artifact=30%, metadata=20%)', () => {
    // model=100, artifact=0, metadata=0 → 100*0.5 + 0*0.3 + 0*0.2 = 50
    const result = aggregateScores(0, 100, 0);
    expect(result.final_score).toBe(50);
  });

  test('should handle non-numeric inputs gracefully', () => {
    const result = aggregateScores(undefined, null, 'abc');
    expect(result.final_score).toBe(50); // all fallback to 50
  });

  test('should include breakdown in result', () => {
    const result = aggregateScores(60, 70, 80);
    expect(result.breakdown).toEqual({
      model_score: 70,
      artifact_score: 80,
      metadata_score: 60
    });
  });
});
