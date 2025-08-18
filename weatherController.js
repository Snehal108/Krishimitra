import { fetchWeatherData } from "../services/weatherService.js";

export const getWeather = async (req, res) => {
  try {
    const city = req.params.city || "Pune";
    const data = await fetchWeatherData(city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather", error: error.message });
  }
};
