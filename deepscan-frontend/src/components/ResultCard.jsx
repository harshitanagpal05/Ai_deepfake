import React from 'react';
import ConfidenceMeter from './ConfidenceMeter';

function getVerdictMeta(verdict, score) {
  const v = (verdict || '').toUpperCase();
  if (v.includes('FAKE') || v.includes('SYNTHETIC') || v.includes('MANIPULATED')) {
    return { 
      color: 'var(--rose)', 
      bg: 'rgba(244, 63, 94, 0.08)', 
      border: 'rgba(244, 63, 94, 0.25)', 
      icon: '⚠', 
      label: 'DEEPFAKE_DETECTED' 
    };
  }
  if (v.includes('REAL') || v.includes('AUTHENTIC') || v.includes('GENUINE')) {
    return { 
      color: 'var(--emerald)', 
      bg: 'rgba(16, 185, 129, 0.08)', 
      border: 'rgba(16, 185, 129, 0.25)', 
      icon: '✓', 
      label: 'AUTHENTIC_MEDIA' 
    };
  }
  // fallback based on score
  if (score > 60) {
    return { 
      color: 'var(--rose)', 
      bg: 'rgba(244, 63, 94, 0.08)', 
      border: 'rgba(244, 63, 94, 0.25)', 
      icon: '⚠', 
      label: 'SUSPICIOUS_SIGNALS' 
    };
  }
  return { 
    color: 'var(--amber)', 
    bg: 'rgba(245, 158, 11, 0.08)', 
    border: 'rgba(245, 158, 11, 0.25)', 
    icon: '?', 
    label: 'UNVERIFIED_STATUS' 
  };
}

export default function ResultCard({
  score,
  verdict,
  model_score: modelScore,
  metadata_score: metadataScore,
}) {
  const safeScore = Number.isFinite(score) ? Number(score) : 0;
  const meta = getVerdictMeta(verdict, safeScore);

  return (
    <section className="result-card">
      <div className="result-card__kicker" style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--primary-light)', fontSize: '0.6rem' }}>
        LOG_INFERENCE_RESULT
      </div>

      {/* Verdict header */}
      <div
        className="result-card__verdict-block"
        style={{ 
          background: meta.bg, 
          border: `1px solid ${meta.border}`, 
          borderRadius: 16, 
          padding: '24px 20px', 
          marginBottom: 20,
          backdropFilter: 'blur(12px)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '100%', background: meta.color }} />
        
        <div className="result-card__verdict-icon" style={{ color: meta.color, fontSize: '1.4rem' }}>{meta.icon}</div>
        <div>
          <div className="result-card__verdict-label" style={{ color: meta.color, fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>
            {meta.label}
          </div>
          <div className="result-card__verdict-raw" style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginTop: 4, fontFamily: "'Space Grotesk', sans-serif" }}>
            {verdict || 'Running...'}
          </div>
        </div>
        <div className="result-card__score-badge" style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: meta.color, lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>
            {safeScore.toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.62rem', color: 'var(--muted)', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
            Inference_Score
          </div>
        </div>
      </div>

      <ConfidenceMeter score={safeScore} color={meta.color} />

      <div className="result-card__breakdown" style={{ marginTop: 24 }}>
        <div className="result-card__breakdown-title" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem' }}>
          Breakdown_Signals
        </div>
        <div className="result-card__breakdown-grid">
          <div className="result-card__breakdown-item">
            <div className="result-card__breakdown-meta">
              <span className="result-card__breakdown-icon">🧠</span>
              <span>NEURAL_LAYER</span>
            </div>
            <strong style={{ color: modelScore == null ? 'var(--muted)' : (modelScore > 60 ? 'var(--rose)' : 'var(--emerald)'), fontFamily: "'JetBrains Mono', monospace" }}>
              {modelScore != null ? `${Number(modelScore).toFixed(1)}%` : '--'}
            </strong>
          </div>
          <div className="result-card__breakdown-item">
            <div className="result-card__breakdown-meta">
              <span className="result-card__breakdown-icon">📊</span>
              <span>METADATA_EXT</span>
            </div>
            <strong style={{ color: metadataScore == null ? 'var(--muted)' : (metadataScore > 60 ? 'var(--rose)' : 'var(--emerald)'), fontFamily: "'JetBrains Mono', monospace" }}>
              {metadataScore != null ? `${Number(metadataScore).toFixed(1)}%` : '--'}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

