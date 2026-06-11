import React from 'react';
import './BookingStepsNew.css';

const STEPS_LEFT = [
  { icon: 'search', title: '1. Instant Search', desc: 'Check real-time availability for the Mini Auditorium in seconds.' },
  { icon: 'task_alt', title: '2. Smart Approval', desc: 'Submit your request digitally. Our team reviews entries quickly.' },
  { icon: 'receipt_long', title: '3. Easy Confirmation', desc: 'Get your digital confirmation and technical details immediately.' },
];

const STEPS_RIGHT = [
  { icon: 'settings', title: '4. Technical Setup', desc: 'Coordinate AV, lighting, and seating requirements beforehand.' },
  { icon: 'celebration', title: '5. Event Execution', desc: 'Enjoy a seamless event experience with no obstructions.' },
];

export default function BookingSteps({ stepsRef, stepsVisible }) {
  return (
    <section className="booking-new-section" ref={stepsRef}>
      <div className="booking-new-inner">
        <div className="booking-new-head">
          <div className={`reveal ${stepsVisible ? 'in' : ''}`}>
            <h2 className="section-h2-bold text-center" style={{ width: '100%' }}>
              <span className="text-fill" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', textTransform: 'none', letterSpacing: '-0.04em' }}>
                Platform Booking Steps
              </span>
            </h2>
          </div>
        </div>
        
        <div className={`booking-layout reveal ${stepsVisible ? 'in delay-1' : ''}`}>
          <div className="booking-col">
            {STEPS_LEFT.map((step, i) => (
              <div className="booking-step-item" key={i}>
                <span className="material-symbols-outlined step-icon">{step.icon}</span>
                <h3 className="step-title-new">{step.title}</h3>
                <p className="step-desc-new">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="booking-center-col">
            <img src="/maitaudi.png" alt="Platform usage" className="booking-center-img" />
          </div>
          
          <div className="booking-col">
            {STEPS_RIGHT.map((step, i) => (
              <div className="booking-step-item" key={i}>
                <span className="material-symbols-outlined step-icon">{step.icon}</span>
                <h3 className="step-title-new">{step.title}</h3>
                <p className="step-desc-new">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
