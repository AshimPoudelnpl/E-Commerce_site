import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("bufferCommands", false);

async function ConnectDB() {
  if (!process.env.MONGODB_URI) {
    console.warn("[AI Studio] MONGODB_URI not provided — database offline");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the Database");
  } catch (error) {
    console.warn("[AI Studio] MongoDB not connected — offline mode active:", error.message);
  }
}
export default ConnectDB;
