import React from 'react';
import { Link } from 'react-router-dom';

export default function FeaturesPage() {
  return (
    <div className="page">
      <div className="page__content">
        <h1 className="page__title">Features</h1>
        <p className="page__intro">
          DeepScan offers a range of capabilities to help you verify image authenticity.
        </p>

        <section className="page__section">
          <h2>Image upload & preview</h2>
          <p>
            Drag-and-drop or click to upload. Instant preview before analysis. Supports JPEG, PNG, and WEBP up to 5MB.
          </p>
        </section>

        <section className="page__section">
          <h2>AI probability score</h2>
          <p>
            A clear 0–100% score indicating how likely the image is AI-generated. Color-coded bar: green (likely real), yellow (uncertain), red (likely AI).
          </p>
        </section>

        <section className="page__section">
          <h2>Score breakdown</h2>
          <p>
            See the three components behind the verdict: model score, artifact score, and metadata score.
          </p>
        </section>

        <section className="page__section">
          <h2>EXIF metadata panel</h2>
          <p>
            View camera make, model, software, and timestamp. Missing values are highlighted in red, which often indicates AI-generated content.
          </p>
        </section>

        <section className="page__section">
          <h2>Responsive design</h2>
          <p>
            Works on desktop and mobile with a clean, professional interface.
          </p>
        </section>

        <div className="page__actions">
          <Link to="/" className="page__btn page__btn--primary">
            Start analyzing
          </Link>
        </div>
      </div>
    </div>
  );
}
