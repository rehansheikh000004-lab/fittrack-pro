import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.js";
import analyticsRoutes from "./routes/analytics.js";

dotenv.config();

// --------------------
// CREATE APP FIRST ✔
// --------------------
const app = express();

// --------------------
// MIDDLEWARE
// --------------------
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL, // your vercel frontend URL
  credentials: true
}));

// --------------------
// MONGO CONNECT
// --------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// --------------------
// ROUTES (Use Only After App Exists)
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("📊 FitTrack Analytics API running correctly");
});

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
