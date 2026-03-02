import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { analyzeImage } from '../services/api';
import ResultCard from './ResultCard';
import MetadataPanel from './MetadataPanel';

export default function UploadZone() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const [selectedFile] = acceptedFiles;
    setFile(selectedFile || null);
    setResult(null);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/*': [] },
  });

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return undefined;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await analyzeImage(file);
      setResult(data);
    } catch (err) {
      const serverMessage = err?.response?.data?.error || err?.response?.data?.message;
      setError(serverMessage || 'Failed to analyze the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="upload-zone">
      <div className="upload-zone__card">
        <div
          className={`upload-zone__drop ${isDragActive ? 'is-active' : ''}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="upload-zone__prompt">
            {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
          </div>
          <div className="upload-zone__hint">or click to browse files</div>
        </div>

        {previewUrl && (
          <div className="upload-zone__preview">
            <img src={previewUrl} alt="Uploaded preview" />
          </div>
        )}

        <button
          className="upload-zone__button"
          onClick={handleSubmit}
          disabled={!file || loading}
          type="button"
        >
          {loading ? 'Analyzing...' : 'Analyze Image'}
        </button>

        {error && <div className="upload-zone__error">{error}</div>}
      </div>

      {result && (
        <div className="upload-zone__results">
          <ResultCard
            score={result.score}
            verdict={result.verdict}
            model_score={result.model_score}
            artifact_score={result.artifact_score}
            metadata_score={result.metadata_score}
          />
          <MetadataPanel metadata={result.metadata} />
        </div>
      )}
    </section>
  );
}
