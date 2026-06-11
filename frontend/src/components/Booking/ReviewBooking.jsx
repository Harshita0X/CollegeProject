import React from 'react';
import { TIME_SLOTS } from './SchedulePicker';
export default function ReviewBooking({ data }) {
  const startTimeLabel = TIME_SLOTS.find(t => t.id === data.startTime)?.label || "—";

  const reviewItems = [
    ["Event Title", data.title || "—"],
    ["Department", data.dept || "—"],
    ["Event Type", data.eventType],
    ["Attendance", `${data.attendance} persons`],
    ["Date", data.date ? new Date(data.date).toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "long", day: "numeric" }) : "—"],
    ["Start Time", startTimeLabel],
    ["Duration", data.duration ? `${data.duration} hour${data.duration > 1 ? "s" : ""}` : "—"],
  ];

  return (
    <div className="bp-fade">
      <div className="bp-form-card">
        <div className="bp-sec-title">Review & Confirm</div>
        <div className="bp-sec-sub">Check all details carefully before submitting your booking request.</div>
        
        <div className="bp-sum-grid">
          {reviewItems.map(([k, v]) => (
            <div key={k} className="bp-sum-item">
              <div className="bp-sum-k">{k}</div>
              <div className="bp-sum-v">{v}</div>
            </div>
          ))}
        </div>
        
        <div style={{ 
          marginTop: 22, 
          padding: "13px 15px", 
          background: "var(--ice-2)", 
          borderRadius: "var(--radius)", 
          fontSize: 12, 
          color: "var(--slate)", 
          lineHeight: 1.65 
        }}>
          By submitting, you agree to the MAIT Facility Usage Policies and assume full responsibility for all booked equipment and the venue condition.
        </div>
      </div>
    </div>
  );
}
