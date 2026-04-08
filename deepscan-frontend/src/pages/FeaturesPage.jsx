import React from 'react';
import { Link } from 'react-router-dom';

const FEATURES = [
  { id: '01', title: 'Deep Learning Model', body: 'A heavy neural network trained on millions of authentic and synthetic pairs to pick up model fingerprints.', span: 4 },
  { id: '02', title: 'Metadata Analysis', body: 'We scan EXIF data for contradictory flags or software traces associated with manipulation tools.', span: 8 },
  { id: '03', title: 'Visual Artifacts', body: 'The detection tool looks for common AI rendering errors: texture anomalies, boundary blending, and noise distribution inconsistencies.', span: 6 },
  { id: '04', title: 'Unified Verdict Score', body: 'All signals aggregate into a 0–100% probability-style result with an explainable verdict label.', span: 6 },
  { id: '05', title: 'Secure Handling', body: 'Privacy-first processing ensures your uploads are analyzed and cleared, with no record of your uploaded image.', span: 12 },
];

export default function FeaturesPage() {
  return (
    <div className="features-page">
      <header className="features__header">
        <p className="features__kicker">Capabilities</p>
        <h1 className="features__title">Detection <span>Signals</span></h1>
        <p className="features__subtitle">
          AI Deepfake analyzes more than just the image's surface. We look for deep latent 
          patterns, EXIF inconsistencies, and spatial rendering artifacts.
        </p>
      </header>

      <div className="features-grid">
        {FEATURES.map((f) => (
          <div key={f.id} className={`fcard fcard--span${f.span}`}>
            <div className="fcard__header">
              <span className="fcard__num">{f.id}</span>
              <span className="fcard__tag">Module</span>
            </div>
            <h2 className="fcard__title">{f.title}</h2>
            <p className="fcard__body">{f.body}</p>
          </div>
        ))}
      </div>

      <div className="features__footer">
        <Link to="/checker" className="features__btn features__btn--primary">Get started</Link>
        <Link to="/how-it-works" className="features__btn features__btn--secondary">How it works</Link>
      </div>
    </div>
  );
}
