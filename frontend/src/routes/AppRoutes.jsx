import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Scheduling from '../pages/Scheduling'
import BookingPortal from '../pages/BookingPortal'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Gallery from '../pages/Gallery'
import Events from '../pages/Events'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProtectedRoute from './ProtectedRoute'
import useAuthStore from '../store/useAuthStore'
import ScrollToTop from '../components/ScrollToTop'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
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
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}