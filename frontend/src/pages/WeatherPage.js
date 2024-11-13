// frontend/src/pages/WeatherPage.js
import React from 'react';
import WeatherSearch from '../components/WeatherSearch';

const WeatherPage = () => {
  return (
    <div className="weather-page">
      <h2>Weather Information</h2>
      <WeatherSearch />
    </div>
  );
};

export default WeatherPage;
