import { MONGO_URI } from "../constants/env";
import mongoose from "mongoose";

const postManDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI || MONGO_URI);
    console.log("Successfully connected with DB Atlas");
  } catch (error) {
    console.error("Cannot connect to DB", error);
    process.exit(1);
  }
}

export default postManDataBase;