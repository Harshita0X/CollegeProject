import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  clearError: () => set({ error: null }),

  login: async ({ email, password, role }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        set({ isLoading: false, error: data.message || 'Login failed' });
        return { success: false };
      }

      set({
        user: data.data,
        token: data.token || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return { success: true };

    } catch (err) {
      set({ isLoading: false, error: 'Network error. Is the server running?' });
      return { success: false };
    }
  },

  signup: async ({ name, email, password, role }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        set({ isLoading: false, error: data.message || 'Signup failed' });
        return { success: false };
      }

      set({
        user: data.data,
        token: data.token || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return { success: true };

    } catch (err) {
      set({ isLoading: false, error: 'Network error. Is the server running?' });
      return { success: false };
    }
  },

  logout: () => {
    fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },
}))

export default useAuthStore