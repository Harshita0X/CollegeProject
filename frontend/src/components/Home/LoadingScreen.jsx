import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ isLoaded }) {
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setRemoved(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (removed) return null;

  return (
    <div className={`loading-curtain ${isLoaded ? 'fade-out' : ''}`}>
      <div className="loader-vessel">
        <div className="loader-logo">MAIT</div>
        <div className="loader-bar-wrap">
          <div className={`loader-bar ${isLoaded ? 'full' : ''}`} />
        </div>
      </div>
      <div className="curtain-slice slice-left" />
      <div className="curtain-slice slice-right" />
    </div>
  );
}
