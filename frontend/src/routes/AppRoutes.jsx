import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Scheduling from '../pages/Scheduling'
import BookingPortal from '../pages/BookingPortal'
import Login from '../pages/Login'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProtectedRoute from './ProtectedRoute'
import useAuthStore from '../store/useAuthStore'

export default function AppRoutes() {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={(
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/schedule"
          element={(
            <ProtectedRoute>
              <Scheduling />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/booking"
          element={(
            <ProtectedRoute>
              <BookingPortal />
            </ProtectedRoute>
          )}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}