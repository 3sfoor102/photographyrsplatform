const Question = require("../models/question");
const Booking = require("../models/booking");

const questionIndex = async (req, res) => {
    let allQuestions = await Question.find()
        res.render('questions.ejs', {allQuestions: allQuestions}
)
}

const create = async(req, res)=>{
    const questionData = {}
    questionData.text = req.body.text
    // questionData.author = req.session.user._id

    createdQuestion = await Question.create(questionData)
    res.send('Q Created')

}

module.exports = {
    questionIndex, create,

};
