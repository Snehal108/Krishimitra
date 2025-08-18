import express from "express";

const router = express.Router();

// Example: Fetch pest recommendations for a given crop
router.get("/:crop", (req, res) => {
  const { crop } = req.params;

  // Dummy pest data (later replace with DB/AI logic)
  const pestData = {
    wheat: ["Aphids", "Armyworms", "Termites"],
    rice: ["Stem Borer", "Leaf Folder", "Brown Planthopper"],
    maize: ["Fall Armyworm", "Corn Borer"],
  };

  if (pestData[crop.toLowerCase()]) {
    res.json({
      crop,
      pests: pestData[crop.toLowerCase()],
      message: `Pest info for ${crop}`,
    });
  } else {
    res.status(404).json({ error: "No pest info found for this crop." });
  }
});

export default router;  // 👈 important
