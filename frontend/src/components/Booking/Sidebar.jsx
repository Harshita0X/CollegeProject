import React from 'react';

export default function Sidebar({ pct }) {
  return (
    <aside className="bp-sidebar">
      <div className="bp-logo">
        <div className="bp-logo-mark">
          <svg viewBox="0 0 20 20">
            <path d="M10 2L3 7v11h14V7L10 2z" />
            <rect x="7" y="12" width="6" height="6" fill="rgba(255,255,255,0.25)" />
          </svg>
        </div>
        <span className="bp-logo-text">MAIT Curator</span>
      </div>

      <div>
        <div className="bp-sidebar-badge">
          <svg width="8" height="8" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" fill="currentColor" />
          </svg>
          Event Booking Portal
        </div>
        <div className="bp-sidebar-title">Reserve Your Academic Space.</div>
        <div className="bp-sidebar-desc">
          Submit a request for MAIT's Grand Auditorium. Our operations team reviews
          all applications and responds within 24 hours.
        </div>
      </div>

      <div className="bp-venue-card">
        <div className="bp-venue-card-header">
          <div>
            <div className="bp-venue-name">Grand Auditorium</div>
            <div className="bp-venue-loc">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path
                  d="M5 0C2.79 0 1 1.79 1 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                  fill="rgba(255,255,255,0.4)"
                />
              </svg>
              Main Campus, Block A
            </div>
          </div>
          <div className="bp-status-pill">
            <div className="bp-status-dot" />
            <span className="bp-status-text">Available</span>
          </div>
        </div>
        <div className="bp-venue-stat">
          <span className="bp-venue-stat-label">Capacity</span>
          <span className="bp-venue-stat-val">850 Seats</span>
        </div>
        <div className="bp-venue-stat">
          <span className="bp-venue-stat-label">Acoustics</span>
          <span className="bp-venue-stat-val">Professional Grade</span>
        </div>
        <div className="bp-venue-stat">
          <span className="bp-venue-stat-label">A/V System</span>
          <span className="bp-venue-stat-val">4K Laser + Dolby</span>
        </div>
      </div>

      <div className="bp-progress-wrap">
        <div className="bp-progress-label">
          <span>Completion</span>
          <span>{pct}%</span>
        </div>
        <div className="bp-progress-track">
          <div className="bp-progress-fill" style={{ width: pct + "%" }} />
        </div>
      </div>
    </aside>
  );
}
