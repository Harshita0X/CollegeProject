import React from 'react';
import { FormField } from './Shared';

export default function EventDetails({ data, errors, onChange }) {
  const pctSlider = Math.round((data.attendance - 50) / (850 - 50) * 100);

  return (
    <div className="bp-fade">
      <div className="bp-form-card">
        <div className="bp-sec-title">Event Core Details</div>
        <div className="bp-sec-sub">Tell us what you're planning to host in the Grand Auditorium.</div>
        
        <div className="bp-grid2">
          <FormField label="Event Title" error={errors.title}>
            <input 
              type="text" 
              className={errors.title ? "err" : data.title ? "ok" : ""} 
              value={data.title} 
              onChange={e => onChange("title", e.target.value)} 
              placeholder="e.g. Annual Technical Symposium" 
            />
          </FormField>
          
          <FormField label="Department / Organisation" error={errors.dept}>
            <input 
              type="text" 
              className={errors.dept ? "err" : data.dept ? "ok" : ""} 
              value={data.dept} 
              onChange={e => onChange("dept", e.target.value)} 
              placeholder="e.g. Computer Science Dept." 
            />
          </FormField>
          
          <FormField label="Event Type">
            <select value={data.eventType} onChange={e => onChange("eventType", e.target.value)}>
              <option value="seminar">Seminar / Lecture</option>
              <option value="symposium">Technical Symposium</option>
              <option value="cultural">Cultural Event</option>
              <option value="fest">Annual Fest</option>
              <option value="convocation">Convocation</option>
              <option value="workshop">Workshop / Training</option>
              <option value="other">Other</option>
            </select>
          </FormField>
          
          <FormField label="Expected Attendance">
            <div style={{ marginTop: 4 }}>
              <div className="bp-slider-row">
                <input 
                  type="range" 
                  className="bp-att-slider" 
                  min={50} 
                  max={850} 
                  step={25} 
                  value={data.attendance}
                  style={{ "--pct": pctSlider + "%" }}
                  onChange={e => onChange("attendance", parseInt(e.target.value))} 
                />
                <span className="bp-att-num">{data.attendance}</span>
              </div>
              <div className="bp-cap-bar">
                <div 
                  className="bp-cap-fill" 
                  style={{ 
                    width: pctSlider + "%", 
                    background: data.attendance > 700 ? "#ef4444" : data.attendance > 500 ? "#f59e0b" : "#16a34a" 
                  }} 
                />
              </div>
              <div className="bp-cap-labels">
                <span>50 min</span>
                <span style={{ color: data.attendance > 700 ? "#dc2626" : data.attendance > 500 ? "#d97706" : "var(--slate)" }}>
                  {pctSlider}% of capacity
                </span>
                <span>850 max</span>
              </div>
            </div>
          </FormField>
          
          <div className="bp-full">
            <FormField label="Purpose & Objectives" error={errors.purpose}>
              <textarea 
                className={errors.purpose ? "err" : ""} 
                value={data.purpose} 
                onChange={e => onChange("purpose", e.target.value)} 
                placeholder="Describe the objectives and nature of this event…" 
                rows={3} 
                maxLength={500} 
              />
            </FormField>
            <div className="bp-char-hint">{data.purpose.length} / 500</div>
          </div>
        </div>
      </div>
    </div>
  );
}
