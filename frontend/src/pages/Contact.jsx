import React from 'react';
import './Contact.css';

export default function Contact() {
  const adminEmail = "admin@mait.edu";

  return (
    <div className="contact-container min-h-screen pt-28 pb-20 px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl font-extrabold text-[#001e40] font-headline tracking-tight mb-4 animate-fade-in-up">
          Get in Touch
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Have a query about booking the auditorium or facing issues with an event? Reach out directly to the administration.
        </p>
      </div>

      <div className="contact-layout">
        {/* Left: Contact Info */}
        <div className="contact-info-panel animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2>Contact Information</h2>
          <p className="info-desc">Our support team is available during institutional working hours.</p>
          
          <div className="info-items">
            <div className="info-item">
              <span className="material-symbols-outlined info-icon">location_on</span>
              <div>
                <strong>Campus Address</strong>
                <p>Maharaja Agrasen Institute of Technology<br/>Sector 22, Rohini, Delhi - 110086</p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="material-symbols-outlined info-icon">call</span>
              <div>
                <strong>Phone Support</strong>
                <p>91-8448186942 </p>
              </div>
            </div>

            <div className="info-item">
              <span className="material-symbols-outlined info-icon">mail</span>
              <div>
                <strong>Direct Email</strong>
                <p>{adminEmail}</p>
              </div>
            </div>
          </div>

          <div className="contact-map-placeholder" style={{ padding: 0, overflow: 'hidden' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.893214057894!2d77.06400377488053!3d28.722659375615715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d068dbf44ecd7%3A0xc4ebbe530e6e4f44!2sMaharaja%20Agrasen%20Institute%20Of%20Technology(MAIT)!5e0!3m2!1sen!2sin!4v1718105000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '200px', width: '100%' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="MAIT Campus Map"
            ></iframe>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="contact-form-panel animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2>Send a Message</h2>
          <p className="form-desc">Fill out the form below and it will be sent directly to the Admin's email.</p>
          
          {/* We use FormSubmit or action="mailto:" for simple email routing */}
          <form 
            action={`mailto:${adminEmail}`} 
            method="GET" 
            encType="text/plain" 
            className="contact-form"
          >
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" name="name" placeholder="HARSHITA BEHL" required />
            </div>

            <div className="form-group">
              <label>Regarding Event / Issue</label>
              <input type="text" name="subject" placeholder="e.g. Booking Approval Delay" required />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea name="body" rows="6" placeholder="Describe your query or issue in detail..." required></textarea>
            </div>

            <button type="submit" className="contact-submit-btn">
              <span className="material-symbols-outlined">send</span>
              Send to Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
