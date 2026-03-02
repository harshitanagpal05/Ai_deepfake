import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import UploadZone from './components/UploadZone';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__content">
        <div className="app__hero">
          <h1>AI Image Authenticity Check</h1>
          <p>
            Upload a single image and get a probability score based on model,
            artifact, and metadata analysis.
          </p>
        </div>
        <UploadZone />
      </main>
    </div>
  );
}

export default App;
