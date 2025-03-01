const express = require("express");
const User = require("../models/userModal");
const userApp = express.Router();
const bcryptjs = require("bcryptjs")



// Define routes
userApp.get("/test", async (req, res,next) => {
    res.send({ message: "test route" });
});

userApp.post("/signup",async(req,res,next)=>{
    const { username, email, password } = req.body;
    
    const hashedPassword = bcryptjs.hashSync(password,10)

    const newUser=new User({
        username,email,password:hashedPassword,
    })

    try {
        await newUser.save();
        res.json('Signup successful');
      } catch (error) {
        next(error)
    }
})

module.exports = userApp;
