import React from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = () => (
  <div className="loading-overlay">
    <div className="loading-content">
      <h2>Processing Payment</h2>
      <div className="loading-bar-container">
        <div className="loading-bar-inner"></div>
      </div>
    </div>
  </div>
);

export default LoadingOverlay;
