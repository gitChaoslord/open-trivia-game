import React from 'react';
import "./index.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-container mb-12">
      <div className="loading-indicator" />
    </div>
  )
}
export default LoadingSpinner;