const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Author name is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    birthDay: {
        type: Date,
    },
    passedOn: {
        type: Date,
    }
})