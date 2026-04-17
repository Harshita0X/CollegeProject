import React from 'react';

const CHECKLIST = [
  'Professional-grade security and reliability',
  'Intuitive interface for all user levels',
  'Comprehensive event management tools',
  'Real-time availability and instant confirmations',
];

const SPECS = [
  { k: 'Capacity Range', v: '100 – 400 People' },
  { k: 'Availability', v: '24/7 Online Access' },
  { k: 'Notifications', v: 'Email & System Alerts' },
  { k: 'Approval SLA', v: 'Within 48 Hours' },
  { k: 'AV Support', v: '4K · Dolby Audio · DMX' },
];

export default function AboutSection({ aboutRef, aboutVisible }) {
  return (
    <section className="about-section" ref={aboutRef}>
      <div className="about-inner">
        <div>
          <div className={`reveal ${aboutVisible ? 'in' : ''}`}>
            <span className="about-eyebrow">About the Platform</span>
            <h2 className="about-h2">Excellence in Event<br />Management</h2>
            <p className="about-p">
              Our auditorium booking platform represents the convergence of institutional excellence
              and technological innovation. Designed specifically for academic and professional
              environments, we provide a comprehensive solution that ensures seamless event
              coordination and optimal facility utilization.
            </p>
          </div>
          <ul className={`checklist reveal ${aboutVisible ? 'in delay-2' : ''}`}>
            {CHECKLIST.map((txt, i) => (
              <li className="check-item" key={i}>
                <span className="material-symbols-outlined check-icon">check_circle</span>
                {txt}
              </li>
            ))}
          </ul>
        </div>

        <div className={`specs-card reveal ${aboutVisible ? 'in delay-1' : ''}`}>
          <h3 className="specs-h3">Platform Specifications</h3>
          {SPECS.map((row, i) => (
            <div className="specs-row" key={i}>
              <span className="specs-key">{row.k}</span>
              <span className="specs-val">{row.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
