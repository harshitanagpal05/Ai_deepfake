import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const goToAnalyzer = () => {
    if (window.location.pathname === '/') {
      document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollToAnalyzer: true } });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-text">DeepScan</span>
        </Link>

        <nav className="navbar__links">
          <Link to="/how-it-works" className="navbar__link">
            How it works
          </Link>
          <Link to="/features" className="navbar__link">
            Features
          </Link>
          <Link to="/about" className="navbar__link">
            About
          </Link>
        </nav>

        <div className="navbar__actions">
          <Link to="/how-it-works" className="navbar__btn navbar__btn--secondary">
            Learn more
          </Link>
          <button
            type="button"
            className="navbar__btn navbar__btn--primary"
            onClick={goToAnalyzer}
          >
            Try now
          </button>
        </div>
      </div>
    </header>
  );
}
