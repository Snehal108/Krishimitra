import { fetchMarketPrices } from "../services/marketService.js";

export const getMarketPrices = async (req, res) => {
  try {
    const prices = await fetchMarketPrices();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching market prices", error: error.message });
  }
};
