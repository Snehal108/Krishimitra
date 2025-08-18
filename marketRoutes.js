

// import express from "express";

// const router = express.Router();

// // Dummy data (replace later with real API or DB)
// const marketPrices = {
//   wheat: { price: "₹2200/qtl", location: "Pune Mandi" },
//   rice: { price: "₹1800/qtl", location: "Nashik Mandi" },
//   maize: { price: "₹1600/qtl", location: "Nagpur Mandi" },
// };

// // Example: Fetch price by crop
// router.get("/:crop", (req, res) => {
//   const { crop } = req.params;

//   if (marketPrices[crop.toLowerCase()]) {
//     res.json({
//       crop,
//       ...marketPrices[crop.toLowerCase()],
//     });
//   } else {
//     res.status(404).json({ error: "Market price not found" });
//   }
// });

// export default router;








import express from "express";
const router = express.Router();

// Dummy market price data
const dummyMarketPrices = {
  wheat: [
    { name_en: "Wheat (Delhi)", name_hi: "गेहूं (दिल्ली)", price: "₹2200 / क्विंटल" },
    { name_en: "Wheat (Mumbai)", name_hi: "गेहूं (मुंबई)", price: "₹2300 / क्विंटल" },
  ],
  rice: [
    { name_en: "Rice (Delhi)", name_hi: "चावल (दिल्ली)", price: "₹3000 / क्विंटल" },
    { name_en: "Rice (Lucknow)", name_hi: "चावल (लखनऊ)", price: "₹2900 / क्विंटल" },
  ],
  cotton: [
    { name_en: "Cotton (Surat)", name_hi: "कपास (सूरत)", price: "₹6500 / क्विंटल" },
    { name_en: "Cotton (Nagpur)", name_hi: "कपास (नागपुर)", price: "₹6700 / क्विंटल" },
  ],
};

router.get("/:crop", (req, res) => {
  const crop = req.params.crop.toLowerCase();
  const data = dummyMarketPrices[crop];
  if (data) {
    res.json(data);
  } else {
    res.json([{ name_en: "No data available", name_hi: "कोई डेटा उपलब्ध नहीं", price: "—" }]);
  }
});

export default router;

