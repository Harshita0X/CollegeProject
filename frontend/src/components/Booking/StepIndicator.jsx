import React from 'react';

const STEPS = [
  { id: 1, label: "Event Details" },
  { id: 2, label: "Schedule" },
  { id: 3, label: "Facilities" },
  { id: 4, label: "Contact" },
  { id: 5, label: "Review" },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="bp-steps">
      {STEPS.map((s, i) => (
        <React.Fragment key={s.id}>
          <div className="bp-step">
            <div className={`bp-step-num ${currentStep > s.id ? "done" : currentStep === s.id ? "active" : "pending"}`}>
              {currentStep > s.id
                ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3.5 3.5L10 2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : s.id}
            </div>
            <span className={`bp-step-lbl${currentStep === s.id ? " active" : ""}`}>{s.label}</span>
          </div>
          {i < STEPS.length - 1 && <div className={`bp-step-line${currentStep > s.id ? " done" : ""}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}
