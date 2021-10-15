const mongoose = require("mongoose");
const Joi = require("joi");
const uuidv4 = require("uuid").v4;

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    default: function () {
      return uuidv4();
    },
  },
  firstName: {
    type: String,
    required: [true, "Please provide first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name."],
  },
  email: {
    type: String,
    required: [true, "Please provide email."],
    unique: [true, "Email already exists"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    select: false,
    minLength: 8,
  },
  passwordChangedAt: Date,
});

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    email: Joi.string().email().min(6).max(500).required(),
    password: Joi.string().min(8).max(1024).required(),
  });

  return schema.validate(user);
};

module.exports = { User, validateUser };
