import Booking from '../models/Booking.model.js';

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
