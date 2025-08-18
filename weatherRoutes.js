// import express from "express";
// import { getWeather } from "../controllers/weatherController.js";

// const router = express.Router();

// router.get("/:city", getWeather);

// export default router;



import express from "express";
import axios from "axios";

const router = express.Router();

// Example: Fetch weather by city
router.get("/:city", async (req, res) => {
  const { city } = req.params;

  try {
    const apiKey = "d76f22811edeb3a4e27906c9d07c906b"; // replace with your real key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

export default router;
