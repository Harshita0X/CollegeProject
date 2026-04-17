import React, { useState } from 'react';
import './BookingPortal.css';

// Components
import Sidebar from '../components/Booking/Sidebar';
import StepIndicator from '../components/Booking/StepIndicator';
import EventDetails from '../components/Booking/EventDetails';
import SchedulePicker from '../components/Booking/SchedulePicker';
import FacilitySelector from '../components/Booking/FacilitySelector';
import ContactInfo from '../components/Booking/ContactInfo';
import ReviewBooking from '../components/Booking/ReviewBooking';
import SuccessState from '../components/Booking/SuccessState';

// Utils
import { validateBookingStep } from '../utils/validation';
import api from '../services/api';

const INITIAL_DATA = {
  title: "",
  dept: "",
  eventType: "seminar",
  attendance: 250,
  purpose: "",
  date: "",
  duration: "",
  startTime: "",
  facilities: [],
  name: "",
  email: "",
  phone: "",
  designation: "faculty",
  notes: "",
};

export default function BookingPortal({ onCancel = () => {} }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const updateData = (key, val) => {
    setData(prev => ({ ...prev, [key]: val }));
    if (errors[key]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const nextStep = () => {
    const errs = validateBookingStep(step, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});
    try {
      const resp = await api.post('/bookings/request', data);
      if (resp.data.success) {
        setDone(true);
      } else {
        setErrors({ submit: resp.data.message || "Failed to submit request" });
      }
    } catch (err) {
      console.error("Booking Error:", err);
      const msg = err.response?.data?.message || "Connection error. Please try again.";
      setErrors({ submit: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const pct = Math.round(((step - 1) / 5) * 100);

  if (done) {
    return <SuccessState email={data.email} onCancel={onCancel} />;
  }

  const renderStep = () => {
    switch (step) {
      case 1: return <EventDetails data={data} errors={errors} onChange={updateData} />;
      case 2: return <SchedulePicker data={data} errors={errors} onChange={updateData} />;
      case 3: return <FacilitySelector selected={data.facilities} onChange={val => updateData("facilities", val)} error={errors.facilities} />;
      case 4: return <ContactInfo data={data} errors={errors} onChange={updateData} />;
      case 5: return <ReviewBooking data={data} />;
      default: return null;
    }
  };

  return (
    <div className="booking-portal-root bp-fade">
      <div id="booking-portal-container">
        <Sidebar pct={pct} />
        
        <main className="bp-main">
          <StepIndicator currentStep={step} />
          
          {errors.submit && (
            <div className="bp-alert bp-alert-error" style={{ marginBottom: 20, color: "#dc2626", background: "#fef2f2", padding: "12px", borderRadius: "8px", fontSize: "0.875rem", display: "flex", gap: "8px", border: "1px solid #fee2e2" }}>
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
               {errors.submit}
            </div>
          )}
          
          <div style={{ flex: 1 }}>
            {renderStep()}
          </div>

          <div className="bp-nav-row">
            <button 
              className="bp-btn bp-btn-ghost" 
              onClick={step === 1 ? onCancel : prevStep}
              disabled={isSubmitting}
            >
              {step === 1 ? "Cancel" : "Back"}
            </button>
            
            <button 
              className="bp-btn bp-btn-primary" 
              onClick={step === 5 ? handleSubmit : nextStep}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="bp-spin" style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }} />
                  Processing...
                </span>
              ) : (
                step === 5 ? "Confirm & Submit" : "Continue"
              )}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
