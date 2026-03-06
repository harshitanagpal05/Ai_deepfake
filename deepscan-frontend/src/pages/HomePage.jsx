import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UploadZone from '../components/UploadZone';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToAnalyzer) {
      const timer = setTimeout(() => {
        document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <>
      <div className="app__hero">
        <h1>AI Image Authenticity Check</h1>
        <p>
          Upload a single image and get a probability score based on model,
          artifact, and metadata analysis.
        </p>
      </div>
      <UploadZone id="analyzer" />
    </>
  );
}
