require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());

// Import Routes
const userApp = require("./routes/userApp");

// Environment Variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blog";

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Database is connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ Database connection error:", err));

// Use Routes
app.use("/user-api", userApp);