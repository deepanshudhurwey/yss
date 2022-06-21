const mongoose = require('mongoose')
const { INTEGER } = require('sequelize/types')
const BooksSchema = mongoose.Schema({
    book_id: {
        type: INTEGER
    },
    book_title :{
        type : String
    },
    book_decription :{
        type : String
    },
    book_content :{
        type : String
    },
    type:{
        type : String
    }
})
const Book = mongoose.model('Book',BooksSchema)
module.exports = Book

