import React from 'react';
import { Tick } from './Shared';

const FACILITIES = [
  { id: "audio", name: "Audio (Mics)", hint: "Wireless & Wired" },
  { id: "projector", name: "Visual (Projector)", hint: "4K Laser Unit" },
  { id: "stage", name: "Stage Setup", hint: "Podiums & Chairs" },
  { id: "recording", name: "Recording", hint: "Multi-cam Feed" },
  { id: "lighting", name: "Lighting", hint: "DMX Programmed" },
  { id: "greenroom", name: "Green Room", hint: "Backstage Access" },
  { id: "streaming", name: "Live Streaming", hint: "OBS Integration" },
  { id: "lounge", name: "Guest Lounge", hint: "Refreshment Area" },
  { id: "signage", name: "LED Signage", hint: "Digital Displays" },
];

export default function FacilitySelector({ selected, onChange, error }) {
  const toggle = (id) => {
    const next = selected.includes(id) 
      ? selected.filter(f => f !== id) 
      : [...selected, id];
    onChange(next);
  };

  return (
    <div className="bp-fade">
      <div className="bp-form-card">
        <div className="bp-sec-title">Required Facilities</div>
        <div className="bp-sec-sub">Select all equipment and infrastructure needed for your event.</div>
        
        {error && (
          <div className="bp-alert bp-alert-err">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="7" cy="7" r="6.5" stroke="#b91c1c" />
              <path d="M7 4v4M7 9.5v.5" stroke="#b91c1c" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {error}
          </div>
        )}

        <div className="bp-cb-grid">
          {FACILITIES.map(f => {
            const on = selected.includes(f.id);
            return (
              <div key={f.id} className={`bp-cb-item${on ? " on" : ""}`} onClick={() => toggle(f.id)}>
                <div className="bp-cb-box">{on && <Tick />}</div>
                <div>
                  <div className="bp-cb-name">{f.name}</div>
                  <div className="bp-cb-hint">{f.hint}</div>
                </div>
              </div>
            );
          })}
        </div>

        {selected.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--slate)", marginTop: 18, marginBottom: 8 }}>
              Selected ({selected.length})
            </div>
            <div className="bp-tags">
              {selected.map(id => {
                const f = FACILITIES.find(x => x.id === id);
                return (
                  <div key={id} className="bp-tag">
                    {f?.name}
                    <span className="bp-tag-x" onClick={(e) => { e.stopPropagation(); toggle(id); }}>×</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export { FACILITIES };
