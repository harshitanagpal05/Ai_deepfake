import React from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  return (
    <div className="hiw">
      {/* Top header layer */}
      <header className="hiw__header">
        <p className="hiw__kicker">Guide</p>
        <h1 className="hiw__title">How AI Deepfake Works</h1>
        <p className="hiw__subtitle">
          Upload an image, run analysis, then read an AI probability score plus the signals
          behind it. Built to be understandable — not just accurate.
        </p>
        <div className="hiw__btns">
          <Link to="/" className="hiw__btn hiw__btn--primary">Try it now</Link>
          <Link to="/features" className="hiw__btn hiw__btn--outline">Explore features</Link>
        </div>
      </header>

      {/* Layer 1 */}
      <div className="hiw__layer">
        <div className="hiw__layer-num">01</div>
        <div>
          <h2 className="hiw__layer-title">Upload your image</h2>
          <p className="hiw__layer-body">
            Drag &amp; drop or click to browse. Supported formats: JPEG, PNG, WEBP up to 5 MB.
            Your file is securely sent for inspection — never stored permanently.
          </p>
        </div>
      </div>

      {/* Layer 2 */}
      <div className="hiw__layer">
        <div className="hiw__layer-num">02</div>
        <div>
          <h2 className="hiw__layer-title">AI analysis runs</h2>
          <p className="hiw__layer-body">
            Our backend inspects three layers: model-generated pattern recognition, visual
            artifact detection, and EXIF metadata evaluation — all in under 2 seconds.
          </p>
        </div>
      </div>

      {/* Layer 3 — wide with columns */}
      <div className="hiw__layer">
        <div className="hiw__layer-num">03</div>
        <div style={{ flex: 1 }}>
          <h2 className="hiw__layer-title">Understand your result</h2>
          <div className="hiw__layer-cols">
            <div>
              <h3>What the score means</h3>
              <p>Higher = more likely AI-generated. Use the score as a signal, not absolute proof.</p>
            </div>
            <div>
              <h3>Read the breakdown</h3>
              <p>Review contributing signals for each analyzed image to understand why it was flagged.</p>
            </div>
          </div>

          {/* Summary card inside the layer */}
          <div className="hiw__summary" style={{ marginTop: 24 }}>
            <div className="hiw__summary-label">You'll get</div>
            <ul>
              <li>Verdict label (Real / Suspicious / AI-Generated)</li>
              <li>AI probability score 0–100%</li>
              <li>Score breakdown by signal type</li>
              <li>EXIF / metadata panel with anomaly flags</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
