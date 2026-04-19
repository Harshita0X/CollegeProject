import React, { useState, useEffect } from 'react';
import { FormField } from './Shared';
import api from '../../services/api';

const TIME_SLOTS = [
  { id: "0900", label: "9:00 AM" },
  { id: "1000", label: "10:00 AM" },
  { id: "1100", label: "11:00 AM" },
  { id: "1400", label: "2:00 PM" },
  { id: "1500", label: "3:00 PM" },
  { id: "1600", label: "4:00 PM" },
];
export default function SchedulePicker({ data, errors, onChange }) {
  const [busy, setBusy] = useState([]);
  const [loading, setLoading] = useState(false);
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (data.date) {
      const fetchAvailability = async () => {
        setLoading(true);
        try {
          const resp = await api.get(`/bookings/availability?date=${data.date}`);
          if (resp.data.success) {
            setBusy(resp.data.busySlots || []);
          }
        } catch (err) {
          console.error("Failed to fetch availability:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchAvailability();
    }
  }, [data.date]);

  return (
    <div className="bp-fade">
      <div className="bp-form-card">
        <div className="bp-sec-title">Schedule & Timing</div>
        <div className="bp-sec-sub">Pick your preferred date and time slot. Greyed slots are already booked.</div>
        
        <div className="bp-grid2">
          <FormField label="Preferred Date" error={errors.date}>
            <input 
              type="date" 
              className={errors.date ? "err" : data.date ? "ok" : ""} 
              value={data.date} 
              min={todayStr} 
              onChange={e => onChange("date", e.target.value)} 
            />
          </FormField>
          
          <FormField label="Duration (Hours)" error={errors.duration} hint="Maximum 8 hours per session">
            <input 
              type="number" 
              className={errors.duration ? "err" : data.duration ? "ok" : ""} 
              value={data.duration} 
              onChange={e => onChange("duration", e.target.value)} 
              placeholder="e.g. 3" 
              min={1} 
              max={8} 
            />
          </FormField>
        </div>

        <div style={{ marginTop: 20 }}>
          <FormField label="Start Time" error={errors.startTime}>
            <div className="bp-time-grid">
                {TIME_SLOTS.map(ts => {
                  const isBusy = busy.includes(ts.id);
                  const isSelected = data.startTime === ts.id;
                return (
                  <div 
                    key={ts.id}
                    className={`bp-t-chip${isBusy ? " busy" : isSelected ? " sel" : ""}`}
                    onClick={() => !isBusy && onChange("startTime", ts.id)}
                  >
                    {ts.label}
                    {isBusy && <div className="booked">Booked</div>}
                  </div>
                );
              })}
            </div>
          </FormField>
        </div>

        {data.date && data.startTime && data.duration && (
          <div className="bp-alert bp-alert-warn">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="8" cy="8" r="7.5" stroke="#d97706" />
              <path d="M8 5v4M8 11v.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Requests are reviewed within 24 hours. Confirmation will be sent to your university email upon approval.</span>
          </div>
        )}
      </div>
    </div>
  );
}
export { TIME_SLOTS };
