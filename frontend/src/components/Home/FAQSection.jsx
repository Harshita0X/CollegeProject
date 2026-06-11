import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';

const FAQS = [
  {
    q: 'Where is the event taking place?',
    a: 'The event will be held in the Mini Auditorium, Block 11, Ground Floor, MAIT campus.'
  },
  {
    q: 'Who can attend the event?',
    a: 'The event is open to all MAIT,MAIMS,MABS students interested in technology, innovation, and Development.'
  },
  {
    q: 'What can attendees expect from the event?',
    a: 'Participants can expect expert sessions, interactive discussions, networking opportunities, and insights into the latest developments.'
  },
  {
    q: 'How much time it takes to approve the event',
    a: '  It takess about 48 hours for the event approval.'
  },
  {
    q: 'Is there any registration fee?',
    a: 'No, participation is free for all registered MAIT,MAIMS,MABS Students.Event can decide their respective fees.'
  },
  {
    q: 'Who can organize events in mini auditorium?',
    a: 'All the official societies of MAIT are welcome to organize their events in mini Auditorium.'
  }
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="faq-left">
          <span className="faq-eyebrow">FAQ</span>
          <h2 className="faq-h2">
            Your Questions<br />
            Answered
          </h2>

          <div className="faq-contact-card">
            <span className="material-symbols-outlined help-icon">help_outline</span>
            <p className="contact-text">If your question isn't listed here, reach out and we'll help.</p>
            <Link to="/contact" className="pink-btn">
              Contact Us <span className="material-symbols-outlined btn-icon">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="faq-right">
          {FAQS.map((faq, i) => (
            <div className={`faq-item ${openIdx === i ? 'open' : ''}`} key={i} onClick={() => toggle(i)}>
              <div className="faq-q">
                <span>{faq.q}</span>
                <button className="faq-toggle-btn">
                  <span className="material-symbols-outlined">{openIdx === i ? 'remove' : 'add'}</span>
                </button>
              </div>
              <div className="faq-a" style={{ maxHeight: openIdx === i ? '200px' : '0' }}>
                <div className="faq-a-content">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
