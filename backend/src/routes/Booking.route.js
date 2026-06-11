import express from 'express';
import { requestBooking, getAvailability, getMyBookings, getAllPendingBookings, updateBookingStatus } from '../controllers/Booking.controller.js';
import { protectedRoute, isAdmin } from '../middlewares/Auth.middleware.js';

const router = express.Router();

// Publicly available (to check availability)
router.get('/availability', getAvailability);

// Protected routes (requires login)
router.post('/request', protectedRoute, requestBooking);
router.get('/my', protectedRoute, getMyBookings);

// Admin routes
// Get all pending requests
router.get('/admin/pending', protectedRoute, isAdmin, getAllPendingBookings);

// Approve or reject a request (e.g., PUT /api/bookings/admin/status/12345)
router.put('/admin/status/:id', protectedRoute, isAdmin, updateBookingStatus);

export default router;
