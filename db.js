const mongoose = require("mongoose");
const uri =
  "mongodb+srv://juaid21:zIGQWM427xmBMxg5@cluster0.eyoad.mongodb.net/book-shop?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});
const connection =  mongoose.connection;

connection.once('open', () => {
    console.log('connected successfully')
})