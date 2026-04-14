import React from 'react';

export function Tick() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <polyline points="2,5 4,7.5 8,2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Err({ msg }) {
  if (!msg) return null;
  return (
    <div className="bp-err-msg">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5.5" stroke="#b91c1c" />
        <path d="M6 4v3M6 8.5v.5" stroke="#b91c1c" strokeLinecap="round" strokeWidth="1.2" />
      </svg>
      {msg}
    </div>
  );
}

export function FormField({ label, error, hint, children }) {
  return (
    <div className="bp-field">
      <label>{label}</label>
      {children}
      <Err msg={error} />
      {hint && !error && (
        <div style={{ fontSize: 11, color: "var(--slate)", marginTop: 2 }}>{hint}</div>
      )}
    </div>
  );
}
