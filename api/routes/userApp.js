const express = require("express");
const User = require("../models/userModal");
const userApp = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/error.js");


// Test route
userApp.get("/test", async (req, res) => {
  res.send({ message: "test route" });
});

// Signup route
userApp.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "Email is already in use"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
});

// Signin route
userApp.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Find user by email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Validate password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Exclude password from response
    const { password: pass, ...rest } = validUser._doc;

    res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({ success: true, ...rest });
  
  } catch (error) {
    next(error);
  }
});

module.exports = userApp;
