import React from 'react';

const CHECKLIST = [
  'Secure and reliable platform',
  'Easy to use for everyone',
  'Everything you need to manage events',
  'Real-time availability and instant confirmations',
];

const SPECS = [
  { k: 'Capacity Range', v: '100 – 400 People' },
  { k: 'Availability', v: '24/7 Online Access' },
  { k: 'Notifications', v: 'Email & System Alerts' },
  { k: 'Approval SLA', v: 'Within 48 Hours' },
];

export default function AboutSection({ aboutRef, aboutVisible }) {
  return (
    <section className="about-section" ref={aboutRef}>
      <div className="about-inner">
        <div>
          <div className={`reveal ${aboutVisible ? 'in' : ''}`}>
            <span className="about-eyebrow">About the Platform</span>
            <h2 className="about-h2">Smarter Event Management<br />Starts Here</h2>
            <p className="about-p">
              A smart auditorium booking platform built for societies of MAIT,MAIMS and MABS. Plan, manage, and execute events effortlessly—all in one place
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

        <div className={`premium-specs reveal ${aboutVisible ? 'in delay-1' : ''}`}>
          <div className="specs-top">
            <h3 className="specs-h3">System Specifications</h3>
            <span className="specs-badge">2026 Edition</span>
          </div>
          <div className="specs-content">
            {SPECS.map((row, i) => (
              <div className="specs-row-modern" key={i}>
                <span className="specs-k">{row.k}</span>
                <div className="specs-line" />
                <span className="specs-v">{row.v}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
