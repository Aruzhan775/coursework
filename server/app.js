import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import eventsRoutes from "./routes/events.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/events", eventsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
