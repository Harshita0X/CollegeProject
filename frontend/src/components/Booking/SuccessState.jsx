import React from 'react';

export default function SuccessState({ email, onCancel }) {
  const refId = "MAIT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <div className="bp-success bp-fade">
      <div className="bp-s-icon">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M5 13l6 6 10-12" stroke="#1a7a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{ 
        fontFamily: "var(--font-head)", 
        fontSize: 24, 
        fontWeight: 800, 
        color: "var(--navy)", 
        letterSpacing: "-0.4px" 
      }}>Request Submitted!</h2>
      <p style={{ 
        marginTop: 10, 
        fontSize: 14, 
        color: "var(--slate)", 
        maxWidth: 360, 
        lineHeight: 1.75 
      }}>Your booking request for the Grand Auditorium has been received. Our team will review and confirm within 24 hours.</p>
      <div className="bp-s-ref">{refId}</div>
      <p style={{ fontSize: 12, color: "var(--slate)", marginBottom: 28 }}>
        Confirmation will be sent to <strong style={{ color: "var(--navy)" }}>{email}</strong>. Keep this reference number handy.
      </p>
      <button className="bp-btn bp-btn-ghost" onClick={onCancel}>Close Portal</button>
    </div>
  );
}
