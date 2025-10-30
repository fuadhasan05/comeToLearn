import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";
import moduleRoutes from "./routes/module.routes.js";

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

// Register middleware and routes before starting the server
app.use("/api/courses", courseRoutes);
app.use('/api/modules', moduleRoutes);

// Root route
app.get("/", (req, res) => res.send("API is running 🚀"));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB, then start the server. This prevents the app from
// accepting requests that would trigger Mongoose queries before the
// connection is established (which causes buffering/timeouts).
mongoose
  .connect(mongoUri, {
    // Use the new unified topology engine
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    // Exit the process — better to fail fast in prod so the platform can
    // restart with a correct config rather than accept requests that will fail.
    process.exit(1);
  });
