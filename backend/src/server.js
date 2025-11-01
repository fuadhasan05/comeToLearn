import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import courseRoutes from "./routes/course.routes.js";
import moduleRoutes from "./routes/module.routes.js";
import enrollmentRoutes from './routes/enrollment.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('MONGODB_URI is not set in environment. Aborting startup.');
  process.exit(1);
}

// middleware and routes
app.use("/api/courses", courseRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Root route
app.get("/", (req, res) => res.send("API is running 🚀"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
