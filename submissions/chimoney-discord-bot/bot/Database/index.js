require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Get mongoURI from environment variables
    const mongoUri = process.env.MONGO_URI;

    // Connect to database
    await mongoose.connect(mongoUri);
    console.log("successfully connected to db");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connectDB };
