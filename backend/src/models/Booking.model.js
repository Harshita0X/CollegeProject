import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Event Details
    eventTitle: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true,
        enum: ['seminar', 'symposium', 'cultural', 'fest', 'convocation', 'workshop', 'other']
    },
    attendance: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    // Schedule Details
    date: {
        type: String, // Format: YYYY-MM-DD
        required: true
    },
    startTime: {
        type: String, // Format: HHMM (e.g. "0900")
        required: true
    },
    duration: {
        type: Number, // in hours
        required: true
    },
    // Facilities
    facilities: [{
        type: String
    }],
    // Contact Info (redundant but useful for snapshot)
    contactInfo: {
        name: String,
        email: String,
        phone: String,
        designation: String
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    notes: {
        type: String
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
