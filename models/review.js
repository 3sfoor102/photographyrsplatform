const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;