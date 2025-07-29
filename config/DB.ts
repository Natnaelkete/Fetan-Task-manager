import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URL as string);
    console.log("MongoDb connected successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("MongoDb connection error", error.message);
    } else {
      console.error("MongoDb connection error", error);
    }
    process.exit(1);
  }
};

export default connectDB;
