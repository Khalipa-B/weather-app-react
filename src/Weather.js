import React, { useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

// Mapping OpenWeatherMap icons to react-animated-weather icons
const weatherIconMap = {
  "01d": "CLEAR_DAY",
  "01n": "CLEAR_NIGHT",
  "02d": "PARTLY_CLOUDY_DAY",
  "02n": "PARTLY_CLOUDY_NIGHT",
  "03d": "CLOUDY",
  "03n": "CLOUDY",
  "04d": "CLOUDY",
  "04n": "CLOUDY",
  "09d": "RAIN",
  "09n": "RAIN",
  "10d": "RAIN",
  "10n": "RAIN",
  "11d": "SLEET",
  "11n": "SLEET",
  "13d": "SNOW",
  "13n": "SNOW",
  "50d": "FOG",
  "50n": "FOG",
};

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  function handleChange(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        setWeather({
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          humidity: Math.round(data.main.humidity),
          wind: Math.round(data.wind.speed * 3.6), // m/s to km/h
          icon: data.weather[0].icon,
        });
        setError("");
      })
      .catch(() => {
        setWeather(null);
        setError("City not found. Please try again.");
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter a city" onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      {weather && (
        <div>
          <h2>Weather in {city}</h2>
          <ReactAnimatedWeather
            icon={weatherIconMap[weather.icon] || "CLEAR_DAY"}
            color="goldenrod"
            size={64}
            animate={true}
          />
          <ul>
            <li>Temperature: {weather.temperature}°C</li>
            <li>Description: {weather.description}</li>
            <li>Humidity: {weather.humidity}%</li>
            <li>Wind: {weather.wind} km/h</li>
          </ul>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
