import React from 'react';
import UploadZone from '../components/UploadZone';

export default function CheckerPage() {
  return (
    <>
      <div className="app__hero">
        <h1 className="page__title--glow">AI Image Authenticity Check</h1>
        <p>
          Upload an image or video and get a deepfake probability score based on deep learning model
          and metadata analysis.
        </p>
      </div>
      <UploadZone id="analyzer" />
    </>
  );
}

