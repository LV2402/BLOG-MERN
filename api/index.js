require("dotenv").config(); // Load environment variables
const exp = require("express");
const mongoose = require("mongoose");
const app = exp(); // Move this before using it
const userApp=require("./routes/user.route")

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(err => console.log("Database connection error:", err));

  app.use("/user-api",userApp )