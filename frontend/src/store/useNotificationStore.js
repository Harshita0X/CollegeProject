import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/notifications';

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(API_URL, { withCredentials: true });
      if (res.data.success) {
        set({ 
          notifications: res.data.data,
          unreadCount: res.data.unreadCount,
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Error fetching notifications', error);
      set({ isLoading: false });
    }
  },

  markAsRead: async (id) => {
    try {
      const res = await axios.put(`${API_URL}/${id}/read`, {}, { withCredentials: true });
      if (res.data.success) {
        set((state) => ({
          notifications: state.notifications.map(n => 
            n._id === id ? { ...n, isRead: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1)
        }));
      }
    } catch (error) {
      console.error('Error marking as read', error);
    }
  },

  markAllAsRead: async () => {
    try {
      const res = await axios.put(`${API_URL}/read-all`, {}, { withCredentials: true });
      if (res.data.success) {
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, isRead: true })),
          unreadCount: 0
        }));
      }
    } catch (error) {
      console.error('Error marking all as read', error);
    }
  }
}));

export default useNotificationStore;
