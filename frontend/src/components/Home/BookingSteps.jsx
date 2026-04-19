import React from 'react';

const STEPS = [
  { n: '01', title: 'Availability Check', desc: 'Browse our real-time digital calendar to identify open slots. Filter by event type and duration to ensure the perfect fit for your schedule.' },
  { n: '02', title: 'Institutional Approval', desc: 'Submit your event proposal digitally. Our administrative curators review requests within 48 hours to maintain high academic standards.' },
  { n: '03', title: 'Confirmation', desc: 'Once approved, receive your digital access pass and technical rider confirmation. Our support team will coordinate your AV requirements.' },
];

export default function BookingSteps({ stepsRef, stepsVisible }) {
  return (
    <section className="steps-section" ref={stepsRef}>
      <div className="steps-inner">
        <div className="steps-head">
          <span className="steps-eyebrow">Seamless Orchestration</span>
          <h2 className="steps-h2">The Booking Journey</h2>
        </div>
        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <div key={i} className={`step-card reveal ${stepsVisible ? `in delay-${i + 1}` : ''}`}>
              <div className="step-big-num">{s.n}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
