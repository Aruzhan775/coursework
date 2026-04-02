import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  name: String,
  age: Number,
  city: String,
  phone: String,
  bio: String,

  tickets: {
    type: [
      {
        eventId: String,
        title: String,
        date: Date,
        address: String
      }
    ],
    default: []
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);