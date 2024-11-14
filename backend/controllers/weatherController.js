const axios = require('axios');

const getWeatherData = async (req, res) => {
  const city = req.query.city;
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric'
      }
    });
    const data = response.data;
    res.status(200).json({
      city: data.name,
      temperature: data.main.temp,
      weather: data.weather[0].main,
      humidity: data.main.humidity,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
};


module.exports = { getWeatherData };
