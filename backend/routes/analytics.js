import express from "express";
const router = express.Router();

// Dummy analytics (You can replace with real DB later)
router.get("/", (req, res) => {
  res.json({
    steps: [5000, 7000, 6500, 8000, 9000, 7500, 8200],
    calories: [2200, 2100, 2500, 2300, 2000, 2400, 2600],
    weight: [75, 74.8, 74.5, 74.3, 74.1, 73.9, 73.7]
  });
});

export default router;
