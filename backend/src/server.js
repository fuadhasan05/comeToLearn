import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/courses", courseRoutes);

// Root route
app.get("/", (req, res) => res.send("API is running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
