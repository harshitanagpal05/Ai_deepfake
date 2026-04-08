import React from 'react';

export default function ScannerVisual() {
  return (
    <div className="scanner-vault">
      {/* Top smaller panel */}
      <div className="scanner-vault__top-panel">
        <div className="scanner-vault__header-bar">
          <div className="scanner-vault__logo">
            <span className="scanner-vault__logo-icon"></span>
          </div>
          <div className="scanner-vault__lines">
            <span></span>
            <span></span>
          </div>
          <div className="scanner-vault__close-btn">
            <span></span>
          </div>
        </div>
        
        <div className="scanner-vault__content">
          <div className="scanner-vault__text-block">
            <p className="scanner-vault__label">Plus Jakustrial</p>
            <h3 className="scanner-vault__title">
              AI Deepfake <span>Detection</span>
            </h3>
            <div className="scanner-vault__desc-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="scanner-vault__btn"></div>
          </div>
          <div className="scanner-vault__scan-box-small">
            <div className="scanner-vault__scan-frame">
              <div className="scanner-vault__scan-head-shadow"></div>
              <div className="scanner-vault__scan-reticle"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main big panel */}
      <div className="scanner-vault__main-panel">
        <div className="scanner-vault__header-bar">
          <div className="scanner-vault__logo">
            <span className="scanner-vault__logo-icon"></span>
          </div>
          <div className="scanner-vault__lines">
            <span className="long"></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="scanner-vault__outline-btn"></div>
        </div>
        
        <div className="scanner-vault__panel-body">
          <div className="scanner-vault__body-left">
            <p className="scanner-vault__label">Plus Jakarta Sans</p>
            <h2 className="scanner-vault__main-title">
              Analysis <br /> Vault<span className="red-dot">.</span>
            </h2>
            <div className="scanner-vault__desc-lines">
              <span className="long"></span>
              <span className="med"></span>
              <span className="short"></span>
            </div>
            
            <div className="scanner-vault__actions">
              <div className="scanner-vault__action-btn primary"></div>
              <div className="scanner-vault__action-btn outline"></div>
            </div>
          </div>
          
          <div className="scanner-vault__body-right">
            <div className="scanner-vault__monitor">
              <div className="scanner-vault__monitor-inner">
                {/* Silhouette / Face */}
                <div className="scanner-vault__face-silhouette"></div>
                {/* Crosshairs & grid */}
                <div className="scanner-vault__monitor-grid"></div>
                {/* Red Scanning Laser Line */}
                <div className="scanner-vault__laser-line"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative PCB/tech lines */}
        <div className="scanner-vault__tech-lines"></div>
      </div>
    </div>
  );
}
