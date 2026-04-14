import { create } from 'zustand'
import api from '../services/api'

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: false,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async ({ email, password, role }) => {
    set({ isLoading: true, error: null })

    try {
      const response = await api.post('/auth/login', { email, password, role })
      const user = response?.data?.data ?? null

      set({
        user,
        isAuthenticated: Boolean(user),
        isLoading: false,
      })

      return { success: true }
    } catch (error) {
      const message = error?.response?.data?.message || 'Unable to login right now.'
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: message,
      })
      return { success: false, error: message }
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null })
    try {
      const response = await api.get('/auth/check')
      const user = response?.data?.data ?? null
      set({
        user,
        isAuthenticated: Boolean(user),
        isCheckingAuth: false,
      })
    } catch (_) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      })
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null })
    try {
      await api.post('/auth/logout')
    } catch (_) {
      // Even if API fails, clear local auth state to avoid stale sessions.
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },
}))

export default useAuthStore