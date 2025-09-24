import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONGO_URL;

async function connectDB() {
  try {
    await mongoose.connect(URL!);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default connectDB;
