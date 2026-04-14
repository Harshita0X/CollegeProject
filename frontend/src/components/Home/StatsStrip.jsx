import React from 'react';
import Counter from './Counter';

const STATS_DATA = [
  { n: 250, s: '+', l: 'Seating Capacity' },
  { n: 48, s: 'hr', l: 'Approval Turnaround' },
  { n: 120, s: '+', l: 'Events Hosted' },
  { n: 4, s: 'K', l: 'Projection Quality' },
];

export default function StatsStrip() {
  return (
    <div className="stats-strip">
      <div className="stats-grid">
        {STATS_DATA.map((item, i) => (
          <div className="stat-cell" key={i}>
            <div className="stat-num">
              <Counter target={item.n} suffix={item.s} />
            </div>
            <div className="stat-lbl">{item.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
