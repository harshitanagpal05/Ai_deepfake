import React from 'react';
import { Link } from 'react-router-dom';

export default function LearnMorePage() {
  return (
    <div className="how">
      <header className="how__hero">
        <div className="how__hero-copy">
          <p className="how__kicker">Learn More</p>
          <h1 className="how__title">Technology & Signal Types</h1>
          <p className="how__subtitle">
            AI Deepfake uses advanced machine learning models, artifacts analysis, and metadata verification to detect AI-generated content. Discover how our technology works.
          </p>
          <div className="how__cta-row">
            <Link to="/" className="how__btn how__btn--primary">Try it now</Link>
            <Link to="/features" className="how__btn how__btn--secondary">Explore features</Link>
          </div>
        </div>
      </header>

      <section className="how__steps" aria-label="Technology Details">
        <article className="how-step">
          <div className="how-step__num">01</div>
          <div className="how-step__body">
            <h2>Model Analysis</h2>
            <p>Our machine learning models are trained to identify deep-level AI patterns and anomalies in pixel distributions that are typical of generative AI.</p>
          </div>
        </article>
        <article className="how-step">
          <div className="how-step__num">02</div>
          <div className="how-step__body">
            <h2>Artifacts Detection</h2>
            <p>We check for visual artifacts, texture inconsistencies, and edge blending issues often left behind by AI generators.</p>
          </div>
        </article>
        <article className="how-step">
          <div className="how-step__num">03</div>
          <div className="how-step__body">
            <h2>Metadata Verification</h2>
            <p>The system inspects EXIF data for mismatched tool signatures, missing standard timestamps, and other digital footprint anomalies.</p>
          </div>
        </article>
        <article className="how-step how-step--wide">
          <div className="how-step__num">04</div>
          <div className="how-step__body">
            <h2>Use Cases</h2>
            <div className="how-step__cols">
              <div>
                <h3>For Media & Journalism</h3>
                <p>Verify user-generated content before publication to maintain journalistic integrity and combat misinformation.</p>
              </div>
              <div>
                <h3>For Enterprises</h3>
                <p>Protect against synthetic identity fraud, deepfake impersonations, and manipulated documents.</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
