import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  price: Number,
  address: String,
  image: String
});

export default mongoose.model("Event", eventSchema);
