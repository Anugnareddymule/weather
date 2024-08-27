import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

  const getWeather = async () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError('');
      } else {
        setError(data.message);
        setWeatherData(null);
      }
    } catch (error) {
      setError('Error fetching the weather data.');
      console.error('Error fetching the weather data:', error);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      <div className="weather-info">
        {weatherData ? (
          <>
            <h2>
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </>
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
}

export default App;

