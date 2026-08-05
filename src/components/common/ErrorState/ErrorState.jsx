import React from 'react';
import './ErrorState.css';
export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <p>{message || "Something went wrong."}</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  );
}