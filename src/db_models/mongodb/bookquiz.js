const mongoose = require('mongoose')
const Book = require('./books')
const BookQuizSchema = mongoose.Schema({
    
    question: {
        type: String
    },
    book_id :{ 
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : Book
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
const BookQuiz = mongoose.model('BookQuiz',BookQuizSchema)
module.exports = BookQuiz

