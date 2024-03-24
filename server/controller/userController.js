const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// @desc   Register a new user
// @route  /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  // find user in database by email
  const userExists = await User.findOne({ email });

  // check if user exists
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // check if the user is created
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Login a user
// @route  /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Unable to indentify user... Try again");
  }
});

// @desc   current user
// @route  /api/users/me
// @access Private
const getMe = (req, res, next) => {
  const { _id, name, email } = req.user;
  const user = {
    _id,
    name,
    email,
  };
  res.status(200);
  res.send(user);
};

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: "300d",
  });
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
