const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
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
        ref: 'User',
    }, 
//     questions:[{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Question',
//    }],
}, {timestamps: true })


const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;


