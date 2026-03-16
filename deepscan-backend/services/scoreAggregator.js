const aggregateScores = (metadataScore, modelScore, artifactScore) => {
  // Weighted average — model is most reliable
  const weights = {
    model: 0.5,
    artifact: 0.3,
    metadata: 0.2
  };

  const finalScore = Math.round(
    (modelScore * weights.model) +
    (artifactScore * weights.artifact) +
    (metadataScore * weights.metadata)
  );

  // Verdict based on final score
  let verdict;
  let confidence;

  if (finalScore >= 70) {
    verdict = 'SYNTHETIC';
    confidence = 'High';
  } else if (finalScore >= 50) {
    verdict = 'LIKELY SYNTHETIC';
    confidence = 'Medium';
  } else if (finalScore >= 35) {
    verdict = 'UNCERTAIN';
    confidence = 'Low';
  } else {
    verdict = 'REAL';
    confidence = 'High';
  }

  return {
    final_score: finalScore,
    verdict,
    confidence,
    breakdown: {
      model_score: modelScore,
      artifact_score: artifactScore,
      metadata_score: metadataScore
    }
  };
};

module.exports = { aggregateScores };