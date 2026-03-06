import React, { useState } from 'react';
import HowItWorksModal from './HowItWorksModal';

export default function Navbar() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar__inner">
          <div className="navbar__logo">
            <span className="navbar__logo-text">DeepScan</span>
          </div>

          <nav className="navbar__links">
            <button
              type="button"
              className="navbar__link navbar__link--btn"
              onClick={() => setShowHowItWorks(true)}
            >
              How it works
            </button>
            <a href="#analyzer" className="navbar__link">Features</a>
            <a href="#analyzer" className="navbar__link">About</a>
          </nav>

          <div className="navbar__actions">
            <button
              type="button"
              className="navbar__btn navbar__btn--secondary"
              onClick={() => setShowHowItWorks(true)}
            >
              Learn more
            </button>
            <button
              type="button"
              className="navbar__btn navbar__btn--primary"
              onClick={scrollToAnalyzer}
            >
              Try now
            </button>
          </div>
        </div>
      </header>

      <HowItWorksModal isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
    </>
  );
}
