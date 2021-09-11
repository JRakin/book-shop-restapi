const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    author: {
        type: String,
        required: [true, 'Author is required']
    },
    language: {
        type: String,
        required: [true, 'Language is required']
    },
    publishedYear: {
        type: String,
    }
})