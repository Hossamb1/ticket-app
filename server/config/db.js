const { default: mongoose } = require("mongoose");

const dotenv = require("dotenv").config;

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  try {
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
  }
};

module.exports = {
  connectDB,
};
