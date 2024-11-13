// frontend/src/components/WeatherSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCityChange = (e) => setCity(e.target.value);

  const fetchWeatherData = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`http://localhost:5000/api/weather?city=${city}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-search">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleCityChange}
        className="city-input"
      />
      <button onClick={fetchWeatherData} className="search-button">
        Get Weather
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h3>{weatherData.city}</h3>
          <p>Temperature: {weatherData.temperature} °C</p>
          <p>Weather: {weatherData.weather}</p>
          <p>Humidity: {weatherData.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
