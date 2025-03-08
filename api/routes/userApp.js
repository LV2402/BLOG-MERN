const express = require("express");
const User = require("../models/userModal");
const userApp = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/error.js");
const { verifyToken } = require("../utils/verifyUser.js");


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

userApp.post("/google", async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      const { password, ...rest } = user._doc;
      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Ensures security in production
          sameSite: "Strict",
        })
        .json(rest);
    }

    // If user does not exist, create a new one
    const username =
    name?.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4);
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: googlePhotoUrl,
    });
    // console.log(newUser)
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const { password, ...rest } = newUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .json(rest);
  } catch (err) {
    next(err);
  }
});

userApp.put("/update/:userId",verifyToken,async(req,res,next)=>{
  if (req.user._id!==req.params.userId){
    return next(errorHandler(403,"You r not allowed to update this user"))
  }
  if(req.body.password){
    if(req.body.password.length<6){
      return next(errorHandler(400,"Password must be atleast 6 characters"))
    }
    req.body.password=bcryptjs.hashSync(req.body,password,10)
  }
  if(req.body.username){
    if(req.body.username<7 || req.body.username.length>20){
      return next(errorHandler(400,"Username must be between 7 and 20 characters"))
    }
    if(req.body.username.includes(' ')){
      return next(errorHandler(400,"Username cannot contain spaces"))
    }
    if(req.body.username!==req.body.username.toLowerCase()){
      return next(errorHandler(400,"Username must be to lowercase"))
    }
    if(req.body.username.match(/^[a-zA-Z0-9]+$/)){
      return next(errorHandler(400,"Username can contain only letters and Numbers"))
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
})

module.exports = userApp;
