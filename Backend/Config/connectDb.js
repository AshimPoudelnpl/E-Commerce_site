import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("please aprovide the MOngo-db URI in the .env file");
}
async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connect Db");
  } catch (error) {
    console.log(error);

    console.log("MongoDb connect error");
    process.exit(1);
  }
}
export default ConnectDB;
