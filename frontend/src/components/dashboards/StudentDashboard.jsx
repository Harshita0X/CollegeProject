import { useState, useEffect } from 'react';
import api from '../../services/api';
import useAuthStore from '../../store/useAuthStore';
import './Dashboard.css';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchMyBookings(); }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await api.get('/bookings/my');
      setBookings(res.data.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="db-page">
      {/* Hero Banner */}
      <div className="db-hero" />

      {/* Profile Card */}
      <div className="db-profile-wrap">
        <div className="db-profile-card">
          <div className="db-avatar">
            {user?.profilePic
              ? <img src={user.profilePic} alt="avatar" />
              : <span className="material-symbols-outlined db-avatar-icon">person</span>
            }
          </div>
          <div className="db-profile-info">
            <p className="db-profile-name">{user?.name || 'Student'}</p>
            <div className="db-profile-table">
              <span className="db-profile-key">Position</span>
              <span className="db-profile-val">
                <span className="db-role-badge student">Student</span>
              </span>
              <span className="db-profile-key">E-Mail</span>
              <span className="db-profile-val">{user?.email || '—'}</span>
              <span className="db-profile-key">Institute</span>
              <span className="db-profile-val">Maharaja Agrasen Institute of Technology</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings */}
      <div className="db-content">
        <h2 className="db-section-title">
          <span className="material-symbols-outlined">event_note</span>
          My Booking Requests
        </h2>

        {loading ? (
          <div className="db-loading">Loading your bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="db-empty">
            <span className="material-symbols-outlined">inbox</span>
            <p>You haven't made any booking requests yet.</p>
          </div>
        ) : (
          <div className="db-cards">
            {bookings.map((b) => (
              <div key={b._id} className="db-card">
                <div className="db-card-top">
                  <div className="db-card-title">{b.eventTitle}</div>
                  <span className={`db-badge ${b.status}`}>{b.status}</span>
                </div>
                <div className="db-row">
                  <span className="db-row-label">Date</span>
                  <span className="db-row-val">{b.date}</span>
                </div>
                <div className="db-row">
                  <span className="db-row-label">Time</span>
                  <span className="db-row-val">{b.startTime}</span>
                </div>
                <div className="db-row">
                  <span className="db-row-label">Type</span>
                  <span className="db-row-val" style={{ textTransform: 'capitalize' }}>{b.eventType}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
