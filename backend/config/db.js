const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes("<db_password>")) {
    console.warn("⚠️  MONGODB_URI contains placeholder '<db_password>'. Running with fallback in-memory database store.");
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.log("ℹ️  Backend will operate in demo fallback mode so all API endpoints stay active.");
    return false;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
