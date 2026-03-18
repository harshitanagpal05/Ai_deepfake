import React from 'react';

function getValue(metadata, key) {
  if (!metadata) {
    return null;
  }
  const value = metadata[key];
  return value === undefined || value === null || value === '' ? null : value;
}

function MetadataRow({ label, value }) {
  const isMissing = value === null;
  return (
    <div className={`metadata-panel__row ${isMissing ? 'is-missing' : ''}`}>
      <span>{label}</span>
      <strong>{isMissing ? 'Missing' : value}</strong>
    </div>
  );
}

export default function MetadataPanel({ metadata }) {
  return (
    <section className="metadata-panel">
      <div className="metadata-panel__title">EXIF Details</div>
      <MetadataRow label="Camera Make" value={getValue(metadata, 'Make')} />
      <MetadataRow label="Camera Model" value={getValue(metadata, 'Model')} />
      <MetadataRow label="Software" value={getValue(metadata, 'Software')} />
      <MetadataRow label="Timestamp" value={getValue(metadata, 'DateTime')} />
    </section>
  );
}
