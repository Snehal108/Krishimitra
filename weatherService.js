import fetch from "node-fetch";

export const fetchWeatherData = async (city) => {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=en`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod !== 200) {
    throw new Error(data.message);
  }

  return {
    location: `${data.name}, ${data.sys.country}`,
    temperature: `${data.main.temp}°C`,
    humidity: `${data.main.humidity}%`,
    description: data.weather[0].description,
  };
};
