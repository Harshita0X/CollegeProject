import express from 'express';
import { requestBooking, getAvailability, getMyBookings } from '../controllers/Booking.controller.js';
import { protectedRoute } from '../middlewares/Auth.middleware.js';

const router = express.Router();

// Publicly available (to check availability)
router.get('/availability', getAvailability);

// Protected routes (requires login)
router.post('/request', protectedRoute, requestBooking);
router.get('/my', protectedRoute, getMyBookings);

export default router;
