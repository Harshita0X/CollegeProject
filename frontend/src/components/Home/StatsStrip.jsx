import React from 'react';
import Counter from './Counter';

const STATS_DATA = [
  { n: 150, s: '+', l: 'Seating Capacity' },
  { n: 48, s: 'hr', l: 'Approval Turnaround' },
  { n: 120, s: '+', l: 'Annual Events' },
  { n: 4, s: 'K', l: 'Projection Quality' },
];

export default function StatsStrip({ statsRef, statsVisible }) {
  return (
    <div className="stats-strip" ref={statsRef}>
      <div className="stats-grid">
        {STATS_DATA.map((item, i) => (
          <div className={`stat-cell reveal ${statsVisible ? 'in' : ''}`} key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="stat-num">
              {statsVisible ? <Counter target={item.n} suffix={item.s} /> : '0'}
            </div>
            <div className="stat-lbl">{item.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
