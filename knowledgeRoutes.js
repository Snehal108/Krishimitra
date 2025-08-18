import express from "express";

const router = express.Router();

// Example knowledge base route
router.get("/", (req, res) => {
  res.json({ message: "Knowledge routes working fine!" });
});

export default router;   // 👈 IMPORTANT: default export
