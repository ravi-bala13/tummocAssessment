const User = require("../models/user.model");
const { saveToken } = require("../utils/JwtUtils");

require("dotenv").config();

const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) => {
  // check if the email address provided already exist
  let user = await User.findOne({ email: req.body.email }).lean().exec();

  // if it already exists then throw an error
  if (user) {
    return res.status(400).json({
      status: "Failed",
      message: "User already exist. Please provide a different email",
    });
  }

  // else we will create the user
  user = await User.create(req.body);

  // we will hash the password as plain text password is harmful
  // above point is done in user.controller

  // we will create the token
  const token = newToken(user);

  // save the token in the db with ttl of 5 minutes
  saveToken(token);

  // return the user and the token

  res.status(201).send({ token, message: "User created successfully" });
};

const login = async (req, res) => {
  try {
    // check if the email address provided already exist
    let user = await User.findOne({ email: req.body.email });

    // if it does not exist then throw an error
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "email or password is wrong",
      });
    }

    // else we match the password

    const match = await user.checkPassword(req.body.password);

    // if not match then throw an error
    if (!match) {
      return res.status(400).json({
        status: "failed",
        message: "email or password is wrong",
      });
    }

    // if it matches then create the token
    const token = newToken(user);

    // return the user and the token
    res.status(201).json({ token, message: "Login succcessfully" });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
  // res.status(201).send("Login");
};

module.exports = { register, login };
