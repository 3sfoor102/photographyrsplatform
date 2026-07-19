const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    package: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }

}, {timestamps: true })


const Booking = mongoose.model("Booking", userSchema);

module.exports = Booking;