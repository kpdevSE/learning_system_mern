const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    lecturerEmail: {
        type: String,
        required: true
    },
    lecturerName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    consultationType: {
        type: String,
        enum: ['in-person', 'virtual'],
        required: true
    },
    platform: {
        type: String,
        enum: ['zoom', 'teams', 'meet', ''],
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);