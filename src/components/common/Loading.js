import React from 'react';

const Loading = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'spinner-sm',
    md: '',
    lg: 'spinner-lg',
  };

  return (
    <div className="loading-overlay">
      <div className={`spinner ${sizeClasses[size] || ''}`}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;

