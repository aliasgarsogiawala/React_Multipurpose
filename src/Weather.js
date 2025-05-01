// Weather.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Weather.css'

const API_KEY = '2f772bf263a60b5e3f7b2e6c5ad97fe0';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
function Home() {
  useEffect(() => {

    document.body.classList.add('weather-page');

    return () => {
      document.body.classList.remove('weather-page');
    };
  }, []);
}

function Weather() {
  
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}?appid=${API_KEY}&q=${city}`);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div class="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      <div className="output-container"> {}
        {weatherData && (
          <div>
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
       )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Weather;
