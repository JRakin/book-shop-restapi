const Joi = require("joi");
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  language: {
    type: String,
    required: [true, "Language is required"],
  },
  publishedYear: {
    type: Date,
  },
});

const Book = mongoose.model("Book", bookSchema);

const validateBook = (book) => {
  const Schema = Joi.object({
    name: Joi.string().min(1).max(300).required(),
    author: Joi.string().required(),
    language: Joi.string().required(),
    publishedYear: Joi.date().less("now"),
  });

  return Schema.validate(book);
};

module.exports = { Book, validateBook };
