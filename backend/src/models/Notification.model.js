import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['booking_alert', 'admin_reminder', 'system_alert'],
        default: 'system_alert'
    },
    isRead: {
        type: Boolean,
        default: false,
        index: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        default: null
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
