import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useNotificationStore from '../store/useNotificationStore';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isSchedule = location.pathname === '/schedule';
  const isGallery = location.pathname === "/gallery";
  const isAboutUs = location.pathname === "/about";
  const isContactUs = location.pathname === "/contact";
  const isEvent = location.pathname === "/events";

  const { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated, fetchNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f8f9fb]/90 dark:bg-[#191c1e]/90 backdrop-blur-md border-b border-[#c4c6cf]/20">
      <div className="flex justify-between items-center w-full px-8 h-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Link className="flex items-center gap-3" to="/">
            <div className="flex flex-col">
              <img src="/logo.png" alt="Logo" />
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-10 font-headline text-sm font-bold tracking-tight">
          <Link
            className={`${isHome ? 'text-[#001e40] dark:text-[#ffffff] border-b-2 border-[#001e40] pb-1' : 'text-slate-500 hover:text-[#001e40] transition-colors'}`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`${isSchedule ? 'text-[#001e40] dark:text-[#ffffff] border-b-2 border-[#001e40] pb-1' : 'text-slate-500 hover:text-[#001e40] transition-colors'}`}
            to="/schedule"
          >
            Schedule
          </Link>
          <Link
            className={`${isGallery ? 'text-[#001e40] dark:text-[#ffffff] border-b-2 border-[#001e40] pb-1' : 'text-slate-500 hover:text-[#001e40] transition-colors'}`}
            to="/gallery"
          >
            Gallery
          </Link>
          <Link
            className={`${isAboutUs ? 'text-[#001e40] dark:text-[#ffffff] border-b-2 border-[#001e40] pb-1' : 'text-slate-500 hover:text-[#001e40] transition-colors'}`}
            to="/about"
          >
            About Us
          </Link>
          <Link
            className={`${isContactUs ? 'text-[#001e40] dark:text-[#ffffff] border-b-2 border-[#001e40] pb-1' : 'text-slate-500 hover:text-[#001e40] transition-colors'}`}
            to="/contact"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex items-center gap-4 relative">
          {isAuthenticated && (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-[#001e40] dark:text-white hover:bg-[#f2f4f6]/50 rounded-md transition-all"
              >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[0.6rem] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-[0_20px_40px_rgba(0,30,64,0.1)] border border-[#e2e8f0] overflow-hidden z-50 animate-fade-in-up origin-top-right">
                  <div className="flex justify-between items-center px-4 py-3 border-b border-[#f1f5f9] bg-[#f8fafc]">
                    <h3 className="font-bold text-[#001e40] text-sm tracking-wide">Notifications</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs text-[#38bdf8] font-bold hover:text-[#001e40] transition-colors"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-500 text-sm">
                        <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">notifications_off</span>
                        <p>No new notifications</p>
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div 
                          key={notif._id} 
                          className={`p-4 border-b border-[#f1f5f9] transition-colors ${notif.isRead ? 'bg-white opacity-70' : 'bg-[#f0f9ff]'}`}
                          onClick={() => {
                            if (!notif.isRead) markAsRead(notif._id);
                          }}
                        >
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h4 className={`text-sm ${notif.isRead ? 'font-semibold text-slate-700' : 'font-bold text-[#001e40]'}`}>
                              {notif.title}
                            </h4>
                            {!notif.isRead && <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-1"></span>}
                          </div>
                          <p className="text-xs text-slate-600 leading-snug">{notif.message}</p>
                          <div className="text-[0.65rem] text-slate-400 mt-2 font-medium uppercase tracking-wider">
                            {new Date(notif.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Conditional Auth Links */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="text-sm font-bold text-[#001e40] dark:text-white hover:underline">
                Dashboard
              </Link>
              <button 
                onClick={() => {
                  useAuthStore.getState().logout();
                  window.location.href = '/login';
                }}
                className="bg-[#001e40] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-[#001e40] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}
