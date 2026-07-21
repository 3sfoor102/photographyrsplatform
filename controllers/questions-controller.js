const Question = require("../models/question");
const Booking = require("../models/booking");

const questionIndex = async (req, res) => {
    const allQuestions = await Question.find()
        res.render('questions.ejs',
        {allQuestions: allQuestions}
)   
}

const create = async(req, res)=>{
    const questionData = {}
    questionData.text = req.body.text
    questionData.author = req.session.user.id

    createdQuestion = await Question.create(questionData)
    console.log(questionData);
    
    res.redirect('/questions')

}
const showQuestion = async (req, res)=>{
    const foundQuestion = await Question.findById(req.params.questionId)//.populate('author')
    res.render('questions-show.ejs', {
        foundQuestion: foundQuestion,
    })
}

module.exports = {
    questionIndex, create, showQuestion, 

};
