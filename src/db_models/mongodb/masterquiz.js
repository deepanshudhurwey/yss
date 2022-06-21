const mongoose = require('mongoose')
const Book = require('./books')
const QuizSchema = mongoose.Schema({
    id:{
        type: String   
    },
    question: {
        type: String
    },
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
})
const Quiz = mongoose.model('Quiz',QuizSchema)
module.exports = Quiz

