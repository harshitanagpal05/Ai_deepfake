import React from 'react';

function getBarColor(score) {
  if (score > 70) {
    return '#e64a19';
  }
  if (score >= 50) {
    return '#f9a825';
  }
  return '#2e7d32';
}

export default function ConfidenceMeter({ score }) {
  const safeScore = Number.isFinite(score) ? Math.min(100, Math.max(0, score)) : 0;
  const barStyle = {
    width: `${safeScore}%`,
    backgroundColor: getBarColor(safeScore),
  };

  return (
    <div className="confidence-meter">
      <div className="confidence-meter__label">
        AI Probability: {safeScore.toFixed(1)}%
      </div>
      <div className="confidence-meter__track">
        <div className="confidence-meter__bar" style={barStyle} />
      </div>
    </div>
  );
}
