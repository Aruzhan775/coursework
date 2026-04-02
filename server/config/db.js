import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB подключена");
  } catch (err) {
    console.error("Ошибка подключения к БД", err);
    process.exit(1);
  }
};