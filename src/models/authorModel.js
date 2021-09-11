const Joi = require("joi");
const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author name is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  birthDay: {
    type: Date,
  },
  passedOn: {
    type: Date,
  },
});

const Author = mongoose.model("Author", authorSchema);

const validateAuthor = (author) => {
  const Schema = Joi.object({
    name: Joi.string().max(255).required(),
    country: Joi.string().max(255).required(),
    birthDay: Joi.date().min("1-1-1").max("now"),
    passedOn: Joi.date().less("now"),
  });

  return Schema.validate(author);
};

module.exports = { Author, validateAuthor };
