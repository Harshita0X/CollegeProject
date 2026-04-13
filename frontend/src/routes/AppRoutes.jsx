import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Scheduling from '../pages/Scheduling'
import Booking from '../pages/booking'
import Login from '../pages/Login'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule" element={<Scheduling />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}