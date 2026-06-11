import { useState, useEffect } from 'react';
import api from '../../services/api';
import useAuthStore from '../../store/useAuthStore';
import './Dashboard.css';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPendingBookings(); }, []);

  const fetchPendingBookings = async () => {
    try {
      const res = await api.get('/bookings/admin/pending');
      setBookings(res.data.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/bookings/admin/status/${id}`, { status });
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (e) {
      console.error(e);
      alert('Error updating status');
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
              : <span className="material-symbols-outlined db-avatar-icon">admin_panel_settings</span>
            }
          </div>
          <div className="db-profile-info">
            <p className="db-profile-name">{user?.name || 'Administrator'}</p>
            <div className="db-profile-table">
              <span className="db-profile-key">Position</span>
              <span className="db-profile-val">
                <span className="db-role-badge admin">Admin</span>
              </span>
              <span className="db-profile-key">E-Mail</span>
              <span className="db-profile-val">{user?.email || '—'}</span>
              <span className="db-profile-key">Institute</span>
              <span className="db-profile-val">Maharaja Agrasen Institute of Technology</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="db-content">
        <h2 className="db-section-title">
          <span className="material-symbols-outlined">pending_actions</span>
          Pending Booking Requests
          {bookings.length > 0 && (
            <span style={{ marginLeft: 'auto', background: '#fee2e2', color: '#b91c1c', fontSize: '0.7rem', fontWeight: 800, padding: '2px 10px', borderRadius: '999px' }}>
              {bookings.length} pending
            </span>
          )}
        </h2>

        {loading ? (
          <div className="db-loading">Loading pending requests...</div>
        ) : bookings.length === 0 ? (
          <div className="db-empty">
            <span className="material-symbols-outlined">check_circle</span>
            <p>No pending requests at the moment. You're all caught up!</p>
          </div>
        ) : (
          <div className="db-cards">
            {bookings.map((b) => (
              <div key={b._id} className="db-card">
                <div className="db-card-top">
                  <div className="db-card-title">{b.eventTitle}</div>
                  <span className="db-badge pending">Pending</span>
                </div>
                <div className="db-row">
                  <span className="db-row-label">Requested By</span>
                  <span className="db-row-val">{b.user?.name || 'Unknown'}</span>
                </div>
                <div className="db-row">
                  <span className="db-row-label">Date & Time</span>
                  <span className="db-row-val">{b.date} at {b.startTime}</span>
                </div>
                <div className="db-row">
                  <span className="db-row-label">Department</span>
                  <span className="db-row-val">{b.department}</span>
                </div>
                <hr className="db-divider" />
                <div className="db-btn-group">
                  <button className="db-btn approve" onClick={() => handleStatusChange(b._id, 'approved')}>
                    Approve
                  </button>
                  <button className="db-btn reject" onClick={() => handleStatusChange(b._id, 'rejected')}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
