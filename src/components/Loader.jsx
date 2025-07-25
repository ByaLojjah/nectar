// src/components/Loader.jsx
import React from 'react';
import './Loader.css'; // (optionnel si tu veux une animation CSS)

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );
};

export default Loader;
