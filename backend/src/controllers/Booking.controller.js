import Booking from '../models/Booking.model.js';
import Notification from '../models/Notification.model.js';
import User from '../models/User.model.js';

export const requestBooking = async (req, res) => {
    try {
        const {
            title, dept, eventType, attendance, purpose,
            date, startTime, duration, facilities,
            name, email, phone, designation, notes
        } = req.body;

        // Basic validation
        if (!title || !date || !startTime || !duration) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Collision Check: Check if any booking exists for the same date and startTime
        // (Simplified collision: exact match on startTime. In production, we'd check overlap of [startTime, startTime+duration])
        const existing = await Booking.findOne({ date, startTime, status: { $ne: 'rejected' } });
        if (existing) {
            return res.status(400).json({ success: false, message: 'This slot is already booked or pending approval.' });
        }

        const newBooking = new Booking({
            user: req.user._id,
            eventTitle: title,
            department: dept,
            eventType,
            attendance,
            purpose,
            date,
            startTime,
            duration,
            facilities,
            contactInfo: { name, email, phone, designation },
            notes,
            status: 'pending'
        });

        await newBooking.save();

        // Notify Admin
        const adminUser = await User.findOne({ role: 'admin' });
        if (adminUser) {
            await Notification.create({
                recipientId: adminUser._id,
                title: 'New Booking Request',
                message: `${name || 'A user'} has requested to book the auditorium on ${date}.`,
                type: 'admin_reminder',
                bookingId: newBooking._id
            });
        }

        res.status(201).json({ success: true, message: 'Booking request submitted successfully', data: newBooking });

    } catch (error) {
        console.error('Error in requestBooking:', error);
        res.status(500).json({ success: false, message: 'Failed to process booking request' });
    }
};

export const getAvailability = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ success: false, message: 'Date is required' });

        const bookings = await Booking.find({ date, status: { $ne: 'rejected' } }).select('startTime');
        const busySlots = bookings.map(b => b.startTime);

        res.status(200).json({ success: true, busySlots });
    } catch (error) {
        console.error('Error in getAvailability:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        console.error('Error in getMyBookings:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getAllPendingBookings = async (req, res) => {
    try {
        // Find all bookings where status is 'pending' and populate the user details
        const bookings = await Booking.find({ status: 'pending' })
            .populate('user', 'name email rollNo')
            .sort({ createdAt: -1 }); // Newest first

        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        console.error('Error in getAllPendingBookings:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params; // Get the booking ID from the URL
        const { status } = req.body; // Get the new status ('approved' or 'rejected') from the request

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Returns the updated document
        );

        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // Notify User
        await Notification.create({
            recipientId: updatedBooking.user,
            title: `Booking ${status.charAt(0).toUpperCase() + status.slice(1)}`,
            message: `Your booking for ${updatedBooking.eventTitle} on ${updatedBooking.date} has been ${status}.`,
            type: 'booking_alert',
            bookingId: updatedBooking._id
        });

        res.status(200).json({ success: true, message: `Booking ${status} successfully`, data: updatedBooking });
    } catch (error) {
        console.error('Error in updateBookingStatus:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
