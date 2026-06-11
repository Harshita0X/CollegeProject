import React, { useState } from 'react';
import './Events.css';

const PAST_EVENTS = [
  {
    id: 1,
    title: "Annual Tech Symposium 2024",
    date: "April 15, 2024",
    department: "Computer Science",
    attendance: "850+",
    description: "A national level technical symposium featuring hackathons, coding challenges, and guest lectures from industry leaders in AI and cloud computing.",
    image: "/Screenshot 2026-04-22 232729.png"
  },
  {
    id: 2,
    title: "Cultural Fest: Resonance",
    date: "March 2-4, 2024",
    department: "Student Council",
    attendance: "1200+",
    description: "The biggest cultural extravaganza of the year. Three days of music, dance, theatrical performances, and art exhibitions.",
    image: "/mait_pic_2.png"
  },
  {
    id: 3,
    title: "Alumni Meet & Networking",
    date: "January 20, 2024",
    department: "Alumni Relations",
    attendance: "500+",
    description: "Welcoming back our esteemed alumni to share their industry experiences, network with current students, and celebrate institutional growth.",
    image: "/maitaudi.png"
  },
  {
    id: 4,
    title: "Convocation Ceremony",
    date: "December 10, 2023",
    department: "Administration",
    attendance: "1000+",
    description: "Honoring the graduating class of 2023 with their degrees in a grand ceremony attended by honorable delegates.",
    image: "/mait_pic.png"
  }
];

export default function Events() {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="events-container min-h-screen pt-28 pb-20 px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl font-extrabold text-[#001e40] font-headline tracking-tight mb-4 animate-fade-in-up">
          Past Events
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Take a look back at some of the most memorable and impactful events hosted in our auditorium.
        </p>
      </div>

      <div className="events-interactive-layout">
        {/* Left Side: List of Events */}
        <div className="events-list">
          {PAST_EVENTS.map((evt, index) => (
            <div 
              key={evt.id}
              className={`event-list-item ${hoveredEvent === evt.id ? 'active' : ''}`}
              onMouseEnter={() => setHoveredEvent(evt.id)}
              onMouseLeave={() => setHoveredEvent(null)}
              onClick={() => setSelectedEvent(evt)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="event-list-date">{evt.date}</div>
              <h2 className="event-list-title">{evt.title}</h2>
              <div className="event-list-dept">By {evt.department}</div>
              
              {/* Mobile Image Preview (Only shows on small screens) */}
              <div className="event-mobile-img" style={{ backgroundImage: `url('${evt.image}')` }}></div>
            </div>
          ))}
        </div>

        {/* Right Side: Hover Image Pop-out (Hidden on mobile) */}
        <div className="events-preview-pane">
          {PAST_EVENTS.map(evt => (
            <div 
              key={`preview-${evt.id}`}
              className={`preview-image-container ${hoveredEvent === evt.id ? 'show' : ''}`}
              style={{ backgroundImage: `url('${evt.image}')` }}
            >
              <div className="preview-overlay">
                <span className="material-symbols-outlined preview-icon">open_in_new</span>
                <span className="preview-text">Click for details</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedEvent(null)}>
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="modal-image-header" style={{ backgroundImage: `url('${selectedEvent.image}')` }}>
              <div className="modal-gradient"></div>
            </div>
            
            <div className="modal-body">
              <div className="modal-meta">
                <span className="meta-pill"><span className="material-symbols-outlined">calendar_today</span>{selectedEvent.date}</span>
                <span className="meta-pill"><span className="material-symbols-outlined">groups</span>{selectedEvent.attendance} Attendees</span>
              </div>
              <h2 className="modal-title">{selectedEvent.title}</h2>
              <div className="modal-dept">Organized by {selectedEvent.department}</div>
              <p className="modal-desc">{selectedEvent.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
