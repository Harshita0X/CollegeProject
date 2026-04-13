import React, { useState } from 'react';
import './BookingPortal.css';

const STEPS = [
  { id: 1, label: "Event Details" },
  { id: 2, label: "Schedule" },
  { id: 3, label: "Facilities" },
  { id: 4, label: "Contact" },
  { id: 5, label: "Review" },
];

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

const TIME_SLOTS = [
  { id: "0900", label: "9:00 AM" },
  { id: "1000", label: "10:00 AM" },
  { id: "1100", label: "11:00 AM" },
  { id: "1400", label: "2:00 PM" },
  { id: "1500", label: "3:00 PM" },
  { id: "1600", label: "4:00 PM" },
];
const BUSY = ["1100", "1400"];

function validate(step, d) {
  const e = {};
  if (step === 1) {
    if (!d.title.trim()) e.title = "Event title is required";
    else if (d.title.trim().length < 5) e.title = "Must be at least 5 characters";
    if (!d.dept.trim()) e.dept = "Department is required";
    if (!d.purpose.trim()) e.purpose = "Purpose is required";
    else if (d.purpose.trim().length < 20) e.purpose = "Please elaborate (min 20 characters)";
  }
  if (step === 2) {
    if (!d.date) e.date = "Please select a date";
    else {
      const dt = new Date(d.date), today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dt <= today) e.date = "Date must be in the future";
    }
    if (!d.startTime) e.startTime = "Please select a start time";
    if (!d.duration) e.duration = "Duration is required";
    else if (parseInt(d.duration) < 1 || parseInt(d.duration) > 8) e.duration = "Must be between 1 and 8 hours";
  }
  if (step === 3) {
    if (d.facilities.length === 0) e.facilities = "Select at least one facility";
  }
  if (step === 4) {
    if (!d.name.trim()) e.name = "Full name is required";
    if (!d.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Enter a valid email address";
    if (!d.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()]{8,}$/.test(d.phone)) e.phone = "Enter a valid phone number";
  }
  return e;
}

function Err({ msg }) {
  if (!msg) return null;
  return <div className="bp-err-msg">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke="#b91c1c" /><path d="M6 4v3M6 8.5v.5" stroke="#b91c1c" strokeLinecap="round" strokeWidth="1.2" /></svg>
    {msg}
  </div>;
}

function F({ label, error, hint, children }) {
  return <div className="bp-field">
    <label>{label}</label>
    {children}
    <Err msg={error} />
    {hint && !error && <div style={{ fontSize: 11, color: "var(--slate)", marginTop: 2 }}>{hint}</div>}
  </div>;
}

function Tick() {
  return <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <polyline points="2,5 4,7.5 8,2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export default function BookingPortal({ initialDate, initialStep = 1, initialData = {}, onSubmit, onCancel }) {
  const [step, setStep] = useState(initialStep);
  const [data, setData] = useState({
    title: "", dept: "", eventType: "seminar", attendance: 200, purpose: "",
    date: initialDate || "", startTime: "", duration: "", facilities: [],
    name: "", email: "", phone: "", designation: "faculty", notes: "",
    ...initialData
  });
  const [errs, setErrs] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k, v) => {
    setData(d => ({ ...d, [k]: v }));
    if (errs[k]) setErrs(e => ({ ...e, [k]: undefined }));
  };

  const pct = done ? 100 : Math.round((step - 1) / (STEPS.length - 1) * 100);

  const handleNext = () => {
    const e = validate(step, data);
    if (Object.keys(e).length) { setErrs(e); return; }
    setErrs({});
    if (step < STEPS.length) setStep(s => s + 1);
  };

  const handleBack = () => { setErrs({}); setStep(s => Math.max(1, s - 1)); };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setDone(true);
    if (onSubmit) onSubmit(data);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        const pctSlider = Math.round((data.attendance - 50) / (850 - 50) * 100);
        return <div className="bp-fade">
          <div className="bp-form-card">
            <div className="bp-sec-title">Event Core Details</div>
            <div className="bp-sec-sub">Tell us what you're planning to host in the Grand Auditorium.</div>
            <div className="bp-grid2">
              <F label="Event Title" error={errs.title}>
                <input type="text" className={errs.title ? "err" : data.title ? "ok" : ""} value={data.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Annual Technical Symposium" />
              </F>
              <F label="Department / Organisation" error={errs.dept}>
                <input type="text" className={errs.dept ? "err" : data.dept ? "ok" : ""} value={data.dept} onChange={e => set("dept", e.target.value)} placeholder="e.g. Computer Science Dept." />
              </F>
              <F label="Event Type">
                <select value={data.eventType} onChange={e => set("eventType", e.target.value)}>
                  <option value="seminar">Seminar / Lecture</option>
                  <option value="symposium">Technical Symposium</option>
                  <option value="cultural">Cultural Event</option>
                  <option value="fest">Annual Fest</option>
                  <option value="convocation">Convocation</option>
                  <option value="workshop">Workshop / Training</option>
                  <option value="other">Other</option>
                </select>
              </F>
              <F label="Expected Attendance">
                <div style={{ marginTop: 4 }}>
                  <div className="bp-slider-row">
                    <input type="range" className="bp-att-slider" min={50} max={850} step={25} value={data.attendance}
                      style={{ "--pct": pctSlider + "%" }}
                      onChange={e => { set("attendance", parseInt(e.target.value)); }} />
                    <span className="bp-att-num">{data.attendance}</span>
                  </div>
                  <div className="bp-cap-bar">
                    <div className="bp-cap-fill" style={{ width: pctSlider + "%", background: data.attendance > 700 ? "#ef4444" : data.attendance > 500 ? "#f59e0b" : "#16a34a" }} />
                  </div>
                  <div className="bp-cap-labels">
                    <span>50 min</span>
                    <span style={{ color: data.attendance > 700 ? "#dc2626" : data.attendance > 500 ? "#d97706" : "var(--slate)" }}>
                      {pctSlider}% of capacity
                    </span>
                    <span>850 max</span>
                  </div>
                </div>
              </F>
              <div className="bp-full">
                <F label="Purpose & Objectives" error={errs.purpose}>
                  <textarea className={errs.purpose ? "err" : ""} value={data.purpose} onChange={e => set("purpose", e.target.value)} placeholder="Describe the objectives and nature of this event…" rows={3} maxLength={500} />
                </F>
                <div className="bp-char-hint">{data.purpose.length} / 500</div>
              </div>
            </div>
          </div>
        </div>;
      case 2:
        const todayStr = new Date().toISOString().split("T")[0];
        return <div className="bp-fade">
          <div className="bp-form-card">
            <div className="bp-sec-title">Schedule & Timing</div>
            <div className="bp-sec-sub">Pick your preferred date and time slot. Greyed slots are already booked.</div>
            <div className="bp-grid2">
              <F label="Preferred Date" error={errs.date}>
                <input type="date" className={errs.date ? "err" : data.date ? "ok" : ""} value={data.date} min={todayStr} onChange={e => set("date", e.target.value)} />
              </F>
              <F label="Duration (Hours)" error={errs.duration} hint="Maximum 8 hours per session">
                <input type="number" className={errs.duration ? "err" : data.duration ? "ok" : ""} value={data.duration} onChange={e => set("duration", e.target.value)} placeholder="e.g. 3" min={1} max={8} />
              </F>
            </div>
            <div style={{ marginTop: 20 }}>
              <F label="Start Time" error={errs.startTime}>
                <div className="bp-time-grid">
                  {TIME_SLOTS.map(ts => {
                    const isBusy = BUSY.includes(ts.id);
                    return <div key={ts.id}
                      className={`bp-t-chip${isBusy ? " busy" : data.startTime === ts.id ? " sel" : ""}`}
                      onClick={() => !isBusy && set("startTime", ts.id)}>
                      {ts.label}
                      {isBusy && <div className="booked">Booked</div>}
                    </div>;
                  })}
                </div>
              </F>
            </div>
            {data.date && data.startTime && data.duration &&
              <div className="bp-alert bp-alert-warn">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="8" cy="8" r="7.5" stroke="#d97706" /><path d="M8 5v4M8 11v.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" /></svg>
                <span>Requests are reviewed within 24 hours. Confirmation will be sent to your university email upon approval.</span>
              </div>
            }
          </div>
        </div>;
      case 3:
        const toggleFac = id => {
          const c = data.facilities;
          set("facilities", c.includes(id) ? c.filter(f => f !== id) : [...c, id]);
        };
        return <div className="bp-fade">
          <div className="bp-form-card">
            <div className="bp-sec-title">Required Facilities</div>
            <div className="bp-sec-sub">Select all equipment and infrastructure needed for your event.</div>
            {errs.facilities &&
              <div className="bp-alert bp-alert-err">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="7" cy="7" r="6.5" stroke="#b91c1c" /><path d="M7 4v4M7 9.5v.5" stroke="#b91c1c" strokeWidth="1.3" strokeLinecap="round" /></svg>
                {errs.facilities}
              </div>
            }
            <div className="bp-cb-grid">
              {FACILITIES.map(f => {
                const on = data.facilities.includes(f.id);
                return <div key={f.id} className={`bp-cb-item${on ? " on" : ""}`} onClick={() => toggleFac(f.id)}>
                  <div className="bp-cb-box">{on && <Tick />}</div>
                  <div><div className="bp-cb-name">{f.name}</div><div className="bp-cb-hint">{f.hint}</div></div>
                </div>;
              })}
            </div>
            {data.facilities.length > 0 &&
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--slate)", marginTop: 18, marginBottom: 8 }}>Selected ({data.facilities.length})</div>
                <div className="bp-tags">
                  {data.facilities.map(id => {
                    const f = FACILITIES.find(x => x.id === id);
                    return <div key={id} className="bp-tag">
                      {f.name}
                      <span className="bp-tag-x" onClick={e => { e.stopPropagation(); toggleFac(id); }}>×</span>
                    </div>;
                  })}
                </div>
              </div>
            }
          </div>
        </div>;
      case 4:
        const emailOk = data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
        return <div className="bp-fade">
          <div className="bp-form-card">
            <div className="bp-sec-title">Contact Information</div>
            <div className="bp-sec-sub">We'll send booking confirmation and updates to these details.</div>
            <div className="bp-grid2">
              <F label="Full Name" error={errs.name}>
                <input type="text" className={errs.name ? "err" : data.name ? "ok" : ""} value={data.name} onChange={e => set("name", e.target.value)} placeholder="Your full name" />
              </F>
              <F label="Designation">
                <select value={data.designation} onChange={e => set("designation", e.target.value)}>
                  <option value="faculty">Faculty Member</option>
                  <option value="student">Student Coordinator</option>
                  <option value="president">Society President</option>
                  <option value="admin">Administrative Staff</option>
                  <option value="hod">Head of Department</option>
                  <option value="dean">Dean / Director</option>
                </select>
              </F>
              <F label="University Email" error={errs.email}>
                <input type="email" className={errs.email ? "err" : emailOk ? "ok" : ""} value={data.email} onChange={e => set("email", e.target.value)} placeholder="yourname@mait.ac.in" />
              </F>
              <F label="Phone Number" error={errs.phone}>
                <input type="tel" className={errs.phone ? "err" : data.phone ? "ok" : ""} value={data.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 98XXX XXXXX" />
              </F>
              <div className="bp-full">
                <F label="Additional Notes">
                  <textarea value={data.notes} onChange={e => set("notes", e.target.value)} placeholder="Accessibility requirements, special setup instructions, or any other requests…" rows={3} maxLength={300} />
                </F>
                <div className="bp-char-hint">{data.notes.length} / 300</div>
              </div>
            </div>
          </div>
        </div>;
      case 5:
        const tl = TIME_SLOTS.find(t => t.id === data.startTime)?.label || "—";
        const fn = data.facilities.map(id => FACILITIES.find(f => f.id === id)?.name).filter(Boolean).join(", ") || "None";
        const items = [
          ["Event Title", data.title || "—"], ["Department", data.dept || "—"],
          ["Event Type", data.eventType], ["Attendance", `${data.attendance} persons`],
          ["Date", data.date ? new Date(data.date).toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "long", day: "numeric" }) : "—"],
          ["Start Time", tl], ["Duration", data.duration ? `${data.duration} hour${data.duration > 1 ? "s" : ""}` : "—"],
          ["Facilities", fn], ["Contact Name", data.name || "—"],
          ["Email", data.email || "—"], ["Phone", data.phone || "—"], ["Designation", data.designation],
        ];
        return <div className="bp-fade">
          <div className="bp-form-card">
            <div className="bp-sec-title">Review & Confirm</div>
            <div className="bp-sec-sub">Check all details carefully before submitting your booking request.</div>
            <div className="bp-sum-grid">
              {items.map(([k, v]) => <div key={k} className="bp-sum-item"><div className="bp-sum-k">{k}</div><div className="bp-sum-v">{v}</div></div>)}
            </div>
            <div style={{ marginTop: 22, padding: "13px 15px", background: "var(--ice-2)", borderRadius: "var(--radius)", fontSize: 12, color: "var(--slate)", lineHeight: 1.65 }}>
              By submitting, you agree to the MAIT Facility Usage Policies and assume full responsibility for all booked equipment and the venue condition.
            </div>
          </div>
        </div>;
      default:
        return null;
    }
  };

  if (done) {
    const refId = "MAIT-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    return (
      <div className="bp-success bp-fade">
        <div className="bp-s-icon">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M5 13l6 6 10-12" stroke="#1a7a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: 24, fontWeight: 800, color: "var(--navy)", letterSpacing: "-0.4px" }}>Request Submitted!</h2>
        <p style={{ marginTop: 10, fontSize: 14, color: "var(--slate)", maxWidth: 360, lineHeight: 1.75 }}>Your booking request for the Grand Auditorium has been received. Our team will review and confirm within 24 hours.</p>
        <div className="bp-s-ref">{refId}</div>
        <p style={{ fontSize: 12, color: "var(--slate)", marginBottom: 28 }}>Confirmation will be sent to <strong style={{ color: "var(--navy)" }}>{data.email}</strong>. Keep this reference number handy.</p>
        <button className="bp-btn bp-btn-ghost" onClick={() => onCancel()}>Close Portal</button>
      </div>
    );
  }

  return (
    <div className="booking-portal-root">
      <div id="booking-portal-container">
        {/* SIDEBAR */}
        <aside className="bp-sidebar">
          <div className="bp-logo">
            <div className="bp-logo-mark">
              <svg viewBox="0 0 20 20"><path d="M10 2L3 7v11h14V7L10 2z" /><rect x="7" y="12" width="6" height="6" fill="rgba(255,255,255,0.25)" /></svg>
            </div>
            <span className="bp-logo-text">MAIT Curator</span>
          </div>

          <div>
            <div className="bp-sidebar-badge">
              <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="currentColor" /></svg>
              Event Booking Portal
            </div>
            <div className="bp-sidebar-title">Reserve Your Academic Space.</div>
            <div className="bp-sidebar-desc">Submit a request for MAIT's Grand Auditorium. Our operations team reviews all applications and responds within 24 hours.</div>
          </div>

          <div className="bp-venue-card">
            <div className="bp-venue-card-header">
              <div>
                <div className="bp-venue-name">Grand Auditorium</div>
                <div className="bp-venue-loc">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0C2.79 0 1 1.79 1 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="rgba(255,255,255,0.4)" /></svg>
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

        {/* MAIN */}
        <main className="bp-main">
          <div className="bp-steps">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="bp-step">
                  <div className={`bp-step-num ${step > s.id ? "done" : step === s.id ? "active" : "pending"}`}>
                    {step > s.id
                      ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3.5 3.5L10 2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      : s.id}
                  </div>
                  <span className={`bp-step-lbl${step === s.id ? " active" : ""}`}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`bp-step-line${step > s.id ? " done" : ""}`} />}
              </React.Fragment>
            ))}
          </div>

          {renderStep()}

          <div className="bp-nav-row">
            <button className="bp-btn bp-btn-ghost" onClick={step === 1 ? onCancel : handleBack}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L4 7l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {step === 1 ? "Cancel" : "Back"}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12, color: "var(--slate)" }}>Step {step} of {STEPS.length}</span>
              {step < STEPS.length
                ? <button className="bp-btn bp-btn-primary" onClick={handleNext}>
                  Continue
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                : <button className="bp-btn bp-btn-primary" onClick={handleSubmit} disabled={loading}>
                  {loading
                    ? <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: "bpSpin 0.8s linear infinite" }}><circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="2" /><path d="M12.5 7a5.5 5.5 0 00-5.5-5.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
                      Submitting...
                    </span>
                    : "Submit Request"
                  }
                </button>
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
