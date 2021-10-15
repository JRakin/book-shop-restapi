const mongoose = require("mongoose");
const uuidv4 = require("uuid").v4;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    min: 1,
    max: 300,
    unique: [true, "Category already exists"],
  },
  catId: {
    type: String,
    default: function () {
      uuidv4();
    },
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
