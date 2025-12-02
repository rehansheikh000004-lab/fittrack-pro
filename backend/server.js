import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import workoutRoutes from "./routes/workouts.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);

app.get("/", (req, res) => {
  res.send("FitTrack Pro Backend Running ✔️");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
