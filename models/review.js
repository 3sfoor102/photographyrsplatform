const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    rating: {
        type: Date,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    // postId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Post',
    // },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }

}, {timestamps: true })


const Booking = mongoose.model("Booking", userSchema);

module.exports = Booking;