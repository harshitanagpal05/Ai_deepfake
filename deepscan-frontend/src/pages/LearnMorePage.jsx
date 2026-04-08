import React from 'react';
import { Link } from 'react-router-dom';

const TECH_BLOCKS = [
  {
    id: '01',
    category: 'Core AI',
    title: 'Model Signal Processor',
    desc: 'Deep neural network trained on millions of authentic and synthetic pairs to identify generational artifacts in latent space.',
    metrics: ['99.2% Base Accuracy', 'Pixel-wise Analysis', 'Low-latency Inference']
  },
  {
    id: '02',
    category: 'Signal',
    title: 'Artifact Detection',
    desc: 'Analyzes texture frequencies and boundary inconsistencies often found in GAN/Diffusion generated outputs.',
    metrics: ['Texture Discontinuity', 'Shadow Anomaly', 'Blur Distribution']
  },
  {
    id: '03',
    category: 'Registry',
    title: 'Metadata Vault',
    desc: 'Cross-checks EXIF data against hardware signatures and known tool footprints to flag digital manipulation.',
    metrics: ['Hardware Signature', 'Signature Hash', 'Timestamp Chain']
  }
];

export default function LearnMorePage() {
  return (
    <div className="learn-v2">
      <header className="learn-v2__header">
        <div className="learn-v2__kicker">Diagnostic / Architecture</div>
        <h1 className="learn-v2__title">System <span>Blueprint</span></h1>
        <p className="learn-v2__subtitle">
          A modular approach to media verification. AI Deepfake combines three distinct 
          signal layers to produce a unified authenticity score.
        </p>
      </header>

      <section className="learn-v2__architecture">
        {TECH_BLOCKS.map((block) => (
          <div key={block.id} className="tech-module">
            <div className="tech-module__header">
              <span className="tech-module__num">{block.id}</span>
              <span className="tech-module__cat">{block.category}</span>
            </div>
            <h2 className="tech-module__title">{block.title}</h2>
            <p className="tech-module__desc">{block.desc}</p>
            <div className="tech-module__metrics">
              {block.metrics.map((m, i) => (
                <div key={i} className="tech-metric">
                  <span className="tech-metric__dot"></span>
                  {m}
                </div>
              ))}
            </div>
            {/* Visual connector line */}
            <div className="tech-module__connector"></div>
          </div>
        ))}

        {/* Central aggregator visual side-piece */}
        <div className="aggregator-core">
          <div className="aggregator-core__box">
            <div className="aggregator-core__logo">🔥</div>
            <div className="aggregator-core__label">Aggregator Core</div>
            <div className="aggregator-core__pulse"></div>
          </div>
        </div>
      </section>

      <div className="learn-v2__footer">
        <Link to="/" className="landing__btn-v2 primary">Try Detection Vault</Link>
      </div>
    </div>
  );
}
