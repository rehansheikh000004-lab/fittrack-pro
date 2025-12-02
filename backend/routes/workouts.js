import express from "express";
import Workout from "../models/Workout.js";

const router = express.Router();

// ---------- ADD WORKOUT ----------
router.post("/add", async (req, res) => {
  try {
    const { userId, exercise, sets, reps, weight } = req.body;

    if (!userId || !exercise || !sets || !reps)
      return res.status(400).json({ message: "All fields required" });

    const workout = await Workout.create({
      userId,
      exercise,
      sets,
      reps,
      weight
    });

    res.status(201).json({ message: "Workout added", workout });

  } catch (err) {
    console.error("Add Workout Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------- GET ALL WORKOUTS ----------
router.get("/:userId", async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(workouts);

  } catch (err) {
    console.error("Fetch Workouts Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------- DELETE WORKOUT ----------
router.delete("/:id", async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: "Workout deleted" });

  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------- UPDATE WORKOUT ----------
router.put("/:id", async (req, res) => {
  try {
    const updated = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Workout updated", updated });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
