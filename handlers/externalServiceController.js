import axios from "axios";

// In-memory cache
const weatherCache = {}; 

export const getWeatherData = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const now = Date.now();
    const cacheEntry = weatherCache[city.toLowerCase()];

    // Check if cached and not expired (1 hour = 3600000 ms)
    if (cacheEntry && (now - cacheEntry.timestamp < 3600000)) {
      return res.json({ source: "cache", data: cacheEntry.data });
    }

    // Fetch from OpenWeatherMap
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    // Save to cache
    weatherCache[city.toLowerCase()] = {
      data: response.data,
      timestamp: now,
    };

    return res.json({ source: "api", data: response.data });

  } catch (error) {
    console.error("Error fetching weather:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};
