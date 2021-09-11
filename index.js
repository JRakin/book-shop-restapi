require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateUser, User } = require("./src/models/userModel");
const {
  validationMiddleware,
} = require("./src/middleware/validationMiddleware");

const app = express();
const port = process.env.PORT || 5000;

const mongoose = require("mongoose");
const uri = `mongodb+srv://juaid21:${process.env.DB_PASS}@cluster0.eyoad.mongodb.net/book-shop?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("connected successfully");
});

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(require("crypto").randomBytes(64).toString("hex"));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post(
  "/create-user",
  validationMiddleware(validateUser),
  async (req, res) => {
    try {
      console.log(req.body);
      const user = new User(req.body);

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      user.password = await bcrypt.hash(req.body.password, salt);
      user.save();

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      });

      res.cookie("jwt", token, {
        expires: new Date(
          Date.now() + process.env.ACCESS_TOKEN_LIFE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      });

      // user.password = undefined;

      res.status(201).json({
        status: "success",
        token,
        data: {
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }
);

app.listen(port, () => {
  console.log(`${chalk.bgGreen("app on port:" + port)}`);
});
