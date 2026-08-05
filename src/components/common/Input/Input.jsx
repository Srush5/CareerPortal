import React from 'react';
import './Input.css';
export default function Input({ label, error, ...props }) {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input {...props} />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}