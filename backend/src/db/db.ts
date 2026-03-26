import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToMongoDB = async (): Promise<void> => {
  try {
    // console.log(Bun.env.MONGO_DB_URL!);
    await mongoose.connect(Bun.env.MONGO_DB_URL!);
  } catch (err) {
    console.error("DB Error:", err);
    throw err;
  }
};
