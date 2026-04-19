import React from 'react';
import { FormField } from './Shared';

export default function ContactInfo({ data, errors, onChange }) {
  const emailOk = data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

  return (
    <div className="bp-fade">
      <div className="bp-form-card">
        <div className="bp-sec-title">Contact Information</div>
        <div className="bp-sec-sub">We'll send booking confirmation and updates to these details.</div>
        
        <div className="bp-grid2">
          <FormField label="Full Name" error={errors.name}>
            <input 
              type="text" 
              className={errors.name ? "err" : data.name ? "ok" : ""} 
              value={data.name} 
              onChange={e => onChange("name", e.target.value)} 
              placeholder="Your full name" 
            />
          </FormField>
          
          <FormField label="Designation">
            <select value={data.designation} onChange={e => onChange("designation", e.target.value)}>
              <option value="faculty">Faculty Member</option>
              <option value="student">Student Coordinator</option>
              <option value="president">Society President</option>
              <option value="admin">Administrative Staff</option>
              <option value="hod">Head of Department</option>
              <option value="dean">Dean / Director</option>
            </select>
          </FormField>
          
          <FormField label="University Email" error={errors.email}>
            <input 
              type="email" 
              className={errors.email ? "err" : emailOk ? "ok" : ""} 
              value={data.email} 
              onChange={e => onChange("email", e.target.value)} 
              placeholder="yourname@mait.ac.in" 
            />
          </FormField>
          
          <FormField label="Phone Number" error={errors.phone}>
            <input 
              type="tel" 
              className={errors.phone ? "err" : data.phone ? "ok" : ""} 
              value={data.phone} 
              onChange={e => onChange("phone", e.target.value)} 
              placeholder="+91 98XXX XXXXX" 
            />
          </FormField>
          
          <div className="bp-full">
            <FormField label="Additional Notes">
              <textarea 
                value={data.notes} 
                onChange={e => onChange("notes", e.target.value)} 
                placeholder="Accessibility requirements, special setup instructions, or any other requests…" 
                rows={3} 
                maxLength={300} 
              />
            </FormField>
            <div className="bp-char-hint">{data.notes.length} / 300</div>
          </div>
        </div>
      </div>
    </div>
  );
}
