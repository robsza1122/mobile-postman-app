import { MONGO_URI } from "../constants/env";
import mongoose from "mongoose";

const postManDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/NEW_DATABASE_NAME');
    console.log("Successfully connected with DB");
  } catch (error) {
    console.error("Cannot connect to DB", error);
    process.exit(1);
  }
}

export default postManDataBase;