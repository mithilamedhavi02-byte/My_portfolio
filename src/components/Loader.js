// src/Loader.js
import React from 'react';

const CanvasLoader = () => {
  return (
    <div className="canvas-loader">
      <div className="loader-circle"></div>
      <style jsx>{`
        .canvas-loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: transparent;
        }
        .loader-circle {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CanvasLoader;