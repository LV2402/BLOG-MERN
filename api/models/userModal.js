const mongoose = require("mongoose");
const { type } = require("os");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)

module.exports=User