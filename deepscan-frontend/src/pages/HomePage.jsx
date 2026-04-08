import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimatedTitle from '../components/AnimatedTitle';
import ScannerVisual from '../components/ScannerVisual';
import FeatureCardComponent from '../components/FeatureCardComponent';
import CountUp from '../components/CountUp';
import '../components/HeroCards.css';
import '../components/ScannerVisual.css';

export default function HomePage({ isAuthed }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollToAnalyzer) {
      const timer = setTimeout(() => {
        document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleStart = () => {
    if (!isAuthed) {
      navigate('/auth', { state: { authMode: 'signin', redirectTo: '/checker' } });
      return;
    }
    navigate('/checker');
  };

  return (
    <div className="home-v2">
      <section className="landing">
        <div className="landing__hero custom-layout">
          <div className="landing__left">
            <div className="kicker-tag">
              <span className="dot"></span>
              Plus Jakustrial
            </div>
            <h1 className="landing__main-title">
              Deepfake <br />
              <span>Detection.</span>
            </h1>
            <p className="landing__subtext">
              Our Analysis Vault uses state-of-the-art neural networks to scan and verify 
              media authenticity with 99.2% accuracy.
            </p>

            <div className="landing__cta">
              <button type="button" className="landing__btn-v2 primary" onClick={handleStart}>
                {isAuthed ? 'Open Vault' : 'Initialize Scan'}
              </button>
              <button
                type="button"
                className="landing__btn-v2 secondary"
                onClick={() => navigate('/learn-more')}
              >
                Learn More
              </button>
            </div>

            <div className="landing__tech-stats">
              <div className="tech-stat-item">
                <span className="label">Scanned</span>
                <span className="value"><CountUp end={1248390} /></span>
              </div>
              <div className="tech-stat-item">
                <span className="label">Status</span>
                <span className="value active">Online</span>
              </div>
            </div>
          </div>

          <div className="landing__right visual-container">
            <ScannerVisual />
          </div>
        </div>
      </section>

      <section className="features-brief">
        <div className="section-header">
           <h2 className="section-title">Core Engine <span>Signals</span></h2>
        </div>
        <div className="landing__mini">
          <FeatureCardComponent index={0} title="Neural Scan" subtitle="Pixel-level artifact detection" />
          <FeatureCardComponent index={1} title="EXIF Vault" subtitle="Metadata signal verification" />
          <FeatureCardComponent index={2} title="Verdict" subtitle="Binary classification results" />
        </div>
      </section>
    </div>
  );
}
