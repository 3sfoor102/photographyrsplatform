const Question = require("../models/question");
const Booking = require("../models/booking");


const showQuestion = async (req,res)=>{
    res.send('This is a question')

}

const create = async(req, res)=>{
    const foundBooking = await Booking.findById(req.params.questionId)
    const questionData = {}
    questionData.text = req.body.text
    questionData.author = req.session.user._id

    foundBooking.questions.push(questionData)
    await foundBooking.save()

}

module.exports = {
    showQuestion, create,

};
