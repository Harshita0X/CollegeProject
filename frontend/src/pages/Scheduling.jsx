import React, { useState } from 'react';
import './Scheduling.css';
import BookingPortal from './BookingPortal';

const RECURRING_HOLIDAYS = {
  "01-26": "Republic Day",
  "08-15": "Independence Day",
  "10-02": "Gandhi Jayanti",
  "01-14": "Makar Sankranti",
  "03-25": "Holi",
  "10-24": "Dussehra",
  "11-01": "Diwali",
  "11-05": "Diwali",
  "12-25": "Christmas",
  "11-15": "Guru Nanak Jayanti",
  "04-14": "Ambedkar Jayanti / Baisakhi",
  "05-23": "Buddha Purnima",
  "06-17": "Eid ul-Adha",
};

const SPECIFIC_HOLIDAYS = {
  "2024-10-02": "Gandhi Jayanti",
  "2024-10-12": "Dussehra",
  "2024-10-31": "Halloween / Indira Gandhi Death Anniversary",
  "2024-11-01": "Diwali",
  "2024-11-02": "Diwali (2nd day)",
  "2024-11-15": "Guru Nanak Jayanti",
  "2024-12-25": "Christmas Day",
  "2025-01-14": "Makar Sankranti",
  "2025-01-26": "Republic Day",
  "2025-03-14": "Holi",
  "2025-03-31": "Eid ul-Fitr",
  "2025-04-06": "Ram Navami",
  "2025-04-10": "Mahavir Jayanti",
  "2025-04-14": "Ambedkar Jayanti / Baisakhi",
  "2025-04-18": "Good Friday",
  "2025-04-20": "Easter Sunday",
  "2025-05-12": "Buddha Purnima",
  "2025-06-07": "Eid ul-Adha",
  "2025-07-06": "Muharram",
  "2025-08-15": "Independence Day",
  "2025-09-05": "Janmashtami",
  "2025-10-02": "Gandhi Jayanti",
  "2025-10-20": "Dussehra",
  "2025-11-05": "Diwali",
  "2025-11-06": "Govardhan Puja",
  "2025-12-25": "Christmas Day",
  "2026-01-14": "Makar Sankranti",
  "2026-01-26": "Republic Day",
  "2026-03-20": "Holi",
  "2026-04-14": "Ambedkar Jayanti / Baisakhi",
  "2026-08-15": "Independence Day",
  "2026-10-02": "Gandhi Jayanti",
};

const INITIAL_BOOKINGS = {
  "2025-04-03": { name: "Annual Convocation 2025", dept: "Main Office / Chancellor Secretariat", time: "09:00 AM – 05:00 PM", attendance: 850, status: "Confirmed" },
  "2025-04-07": { name: "CSE Tech Symposium", dept: "Computer Science & Engineering", time: "10:00 AM – 04:00 PM", attendance: 350, status: "Confirmed" },
  "2025-04-14": { name: "Faculty Development Program", dept: "Academic Affairs", time: "09:30 AM – 01:00 PM", attendance: 120, status: "Confirmed" },
  "2025-04-21": { name: "Alumni Meet 2025", dept: "Alumni Relations", time: "11:00 AM – 06:00 PM", attendance: 600, status: "Pending Approval" },
  "2025-04-28": { name: "IT Department Seminar", dept: "Information Technology", time: "02:00 PM – 05:00 PM", attendance: 200, status: "Confirmed" },
  "2025-05-05": { name: "Orientation Day", dept: "Student Affairs", time: "09:00 AM – 01:00 PM", attendance: 450, status: "Confirmed" },
  "2025-05-12": { name: "Cultural Fest Finals", dept: "Student Council", time: "10:00 AM – 08:00 PM", attendance: 900, status: "Confirmed" },
  "2025-06-02": { name: "Placement Drive", dept: "Training & Placement Cell", time: "08:00 AM – 05:00 PM", attendance: 400, status: "Confirmed" },
};

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Scheduling() {
  const [today] = useState(new Date());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('mait_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fmtKey = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const getHoliday = (y, m, d) => {
    const full = fmtKey(y, m, d);
    if (SPECIFIC_HOLIDAYS[full]) return SPECIFIC_HOLIDAYS[full];
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return RECURRING_HOLIDAYS[`${mm}-${dd}`] || null;
  };

  const isToday = (y, m, d) => 
    y === today.getFullYear() && m === today.getMonth() && d === today.getDate();

  const changeMonth = (dir) => {
    let newMonth = viewMonth + dir;
    let newYear = viewYear;
    if (newMonth > 11) { newMonth = 0; newYear++; }
    else if (newMonth < 0) { newMonth = 11; newYear--; }
    setViewMonth(newMonth);
    setViewYear(newYear);
  };

  const handleDateSelect = (y, m, d) => {
    setSelectedDate(fmtKey(y, m, d));
  };

  const handleBookingSubmit = (data) => {
    const date = data.date;
    const tl = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"][["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].indexOf(data.startTime)] || '—';
    
    const startHour = parseInt(data.startTime.substring(0, 2));
    const endHour = startHour + parseInt(data.duration);
    const endAmPm = endHour >= 12 && endHour < 24 ? 'PM' : 'AM';
    const displayEndHour = endHour % 12 || 12;
    const timeDisplay = `${tl} – ${displayEndHour}:00 ${endAmPm}`;

    const newBooking = {
      name: data.title,
      dept: data.dept,
      time: timeDisplay,
      attendance: data.attendance,
      status: 'Pending Approval'
    };

    const updated = { ...bookings, [date]: newBooking };
    setBookings(updated);
    localStorage.setItem('mait_bookings', JSON.stringify(updated));
    setIsModalOpen(false);
  };

  // Calendar Rendering Logic
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const calendarDays = [];
  // Prev month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({
      y: viewMonth === 0 ? viewYear - 1 : viewYear,
      m: viewMonth === 0 ? 11 : viewMonth - 1,
      d: daysInPrevMonth - firstDay + i + 1,
      otherMonth: true
    });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({ y: viewYear, m: viewMonth, d, otherMonth: false });
  }
  // Next month
  const remaining = calendarDays.length % 7 === 0 ? 0 : 7 - (calendarDays.length % 7);
  for (let d = 1; d <= remaining; d++) {
    calendarDays.push({
      y: viewMonth === 11 ? viewYear + 1 : viewYear,
      m: viewMonth === 11 ? 0 : viewMonth + 1,
      d,
      otherMonth: true
    });
  }

  const currentBooking = selectedDate ? bookings[selectedDate] : null;
  const currentHoliday = selectedDate ? getHoliday(...selectedDate.split('-').map((v, i) => i === 1 ? v - 1 : Number(v))) : null;
  const selectedDateObj = selectedDate ? new Date(selectedDate) : null;

  return (
    <div className="scheduling-portal">
      <main>
        <div className="calendar-section">
          <div className="section-header">
            <div>
              <h1>Auditorium Schedule</h1>
              <p>Manage and view availability for the main block auditorium. </p>
            </div>
            <div className="month-nav">
              <button className="arrow-btn" onClick={() => changeMonth(-1)}>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span id="monthLabel" style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--primary)", padding: "0 8px", minWidth: "140px", textAlign: "center" }}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button className="arrow-btn" onClick={() => changeMonth(1)}>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="calendar-card">
            <div className="cal-head">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="cal-head-cell">{day}</div>
              ))}
            </div>
            <div className="cal-grid">
              {calendarDays.map((day, idx) => {
                const key = fmtKey(day.y, day.m, day.d);
                const holiday = getHoliday(day.y, day.m, day.d);
                const booking = bookings[key];
                const todayFlag = isToday(day.y, day.m, day.d);
                const selectedFlag = selectedDate === key;

                return (
                  <div 
                    key={idx}
                    className={`cal-cell ${day.otherMonth ? 'other-month' : ''} ${holiday ? 'holiday' : ''} ${booking ? 'reserved' : ''} ${todayFlag ? 'today' : ''} ${selectedFlag ? 'selected' : ''}`}
                    onClick={() => !day.otherMonth && handleDateSelect(day.y, day.m, day.d)}
                  >
                    <div className="day-num">{day.d}</div>
                    <div className="cell-tags">
                      {holiday && <div className="tag holiday"><span className="tag-text">{holiday}</span></div>}
                      {booking && <div className="tag reserved"><span className="tag-text">{booking.name}</span></div>}
                      {!holiday && !booking && !day.otherMonth && (
                        <div className="tag available"><div className="tag-dot" style={{ background: "var(--emerald)" }}></div>Open</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="legend">
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--emerald)" }}></div>Available</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--indigo)" }}></div>Booked</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--rose)" }}></div>Indian Holiday</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--primary)" }}></div>Today</div>
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-date-card">
            <div className="date-label">Selected Date</div>
            <h2>{selectedDateObj ? `${MONTH_NAMES[selectedDateObj.getMonth()].slice(0, 3)} ${String(selectedDateObj.getDate()).padStart(2, '0')}, ${selectedDateObj.getFullYear()}` : '—'}</h2>
            <div className="day-of-week">{selectedDateObj ? DAY_NAMES[selectedDateObj.getDay()] : 'Click a date to view details'}</div>
            <div id="sidebarStatusPill">
              {currentHoliday ? (
                <div className="status-pill status-holiday"><span className="material-symbols-outlined fill-icon" style={{ fontSize: "13px" }}>celebration</span>{currentHoliday}</div>
              ) : currentBooking ? (
                <div className="status-pill status-reserved"><span className="material-symbols-outlined fill-icon" style={{ fontSize: "13px" }}>event_busy</span>Reserved</div>
              ) : selectedDate ? (
                <div className="status-pill status-available"><span className="material-symbols-outlined fill-icon" style={{ fontSize: "13px" }}>check_circle</span>Available</div>
              ) : null}
            </div>
          </div>

          <div className="sidebar-details">
            <h3>{currentBooking ? 'Reservation Details' : currentHoliday ? 'Holiday Information' : 'Date Details'}</h3>
            <div id="detailsContent">
              {currentBooking ? (
                <>
                  <div className="detail-row"><div className="detail-label">Event Name</div><div className="detail-value">{currentBooking.name}</div></div>
                  <div className="detail-row"><div className="detail-label">Time Slot</div><div className="detail-value"><span className="material-symbols-outlined">schedule</span>{currentBooking.time}</div></div>
                  <div className="detail-row"><div className="detail-label">Department</div><div className="detail-value"><span className="material-symbols-outlined">account_balance</span>{currentBooking.dept}</div></div>
                  <div className="detail-row"><div className="detail-label">Expected Attendance</div><div className="detail-value"><span className="material-symbols-outlined">groups</span>{currentBooking.attendance} Personnel</div></div>
                  <hr className="divider" />
                  <div className="detail-label">Status</div>
                  <div style={{ marginTop: "6px", display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", background: `${currentBooking.status === 'Confirmed' ? 'var(--emerald)' : 'var(--amber)'}22`, color: currentBooking.status === 'Confirmed' ? 'var(--emerald)' : 'var(--amber)', fontWeight: 700, fontSize: "0.72rem", fontFamily: "'Syne',sans-serif" }}>
                    <span className="material-symbols-outlined fill-icon" style={{ fontSize: "14px" }}>verified</span>{currentBooking.status}
                  </div>
                </>
              ) : currentHoliday ? (
                <>
                  <div className="event-item holiday-item">
                    <div className="event-item-name">🎉 {currentHoliday}</div>
                    <div className="event-item-meta">National / Public Holiday — Auditorium Unavailable</div>
                  </div>
                  <div className="holiday-notice" style={{ marginTop: "14px", borderRadius: "8px" }}>
                    <span className="material-symbols-outlined">block</span>
                    <p><strong>Bookings Disabled</strong>The auditorium is closed on this day due to the institutional holiday.</p>
                  </div>
                </>
              ) : selectedDate ? (
                <>
                  <div className="event-item" style={{ background: "#f0fdf4", borderColor: "var(--emerald)", borderLeft: "3px solid var(--emerald)" }}>
                    <div className="event-item-name" style={{ color: "var(--emerald)" }}>✓ Auditorium Available</div>
                    <div className="event-item-meta">No bookings on this date. You can submit a request below.</div>
                  </div>
                  <div style={{ marginTop: "14px", padding: "12px", background: "var(--surface-low)", borderRadius: "8px", fontSize: "0.78rem", color: "var(--on-surface-var)", lineHeight: 1.5 }}>
                    <strong style={{ display: "block", fontFamily: "'Syne',sans-serif", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>Capacity</strong>
                    Max 450 seating · Fully Air-conditioned<br />Stage + chairs setup included.
                  </div>
                </>
              ) : (
                <div className="empty-details">
                  <span className="material-symbols-outlined">calendar_today</span>
                  <p>Select a date on the calendar to view details</p>
                </div>
              )}
            </div>
          </div>

          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <span className="material-symbols-outlined" style={{ fontSize: "16px", marginRight: "6px" }}>add_circle</span>
            Request New Booking
          </button>
          <button className="btn-secondary">View Resource Guidelines</button>

          <div className="notice-card">
            <span className="material-symbols-outlined">info</span>
            <p><strong>Booking Policy</strong> Requests must be submitted 7 days in advance.</p>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="modal-overlay open" onClick={(e) => e.target.className === 'modal-overlay open' && setIsModalOpen(false)}>
          <BookingPortal 
            initialDate={selectedDate}
            onSubmit={handleBookingSubmit} 
            onCancel={() => setIsModalOpen(false)} 
          />
        </div>
      )}
    </div>
  );
}
