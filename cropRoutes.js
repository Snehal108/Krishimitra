import express from "express";

const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Crop routes working fine!" });
});

export default router;   // 👈 Make sure you have default export
