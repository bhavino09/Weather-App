import React, { useEffect, useState } from "react";
import "./WeatherReport.css";
const APIkey = "3da691e64d898164802aebe661bb8b53";

export default function WeatherReport() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  const fetchDataByCoords = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  };

  useEffect(() => {
    fetchDataByCoords();
  }, []); // Empty dependency array to run the effect only once

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  useEffect(() => {
    if (position.latitude !== null && position.longitude !== null) {
      fetchWeatherData(position.latitude, position.longitude);
    }
  }, [position.latitude, position.longitude]); // Dependency array with latitude and longitude

  const handleCitySearch = async () => {
    if (city.trim() !== "") {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
        // setCity("");
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    } else if (city.trim() !== null && weatherData.name) {
      return `City with name ${city} does not exists`;
    }
  };
  let err = `City with such name does not exists!`;
  return (
    <div className="weather-container">
      <h1 className="weather-title">Weather Report</h1>
      <div className="search-container">
        <button className="search-button" onClick={handleCitySearch}>
          Search
        </button>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          className="search-input"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      {weatherData && weatherData.name && position?.longitude === null ? (
        <div className="weather-info">
          <h2>Weather Information</h2>
          <p>
            <strong>City :</strong> {weatherData.name}
          </p>
          <p>
            <strong>Temperature :</strong> {weatherData.main.temp} °C
          </p>
          <p>
            <strong>Humidity :</strong> {weatherData.main.humidity} %
          </p>
          <p>
            <strong>Weather :</strong> {weatherData.weather[0].description}
          </p>
        </div>
      ) : position?.latitude === null ? (
        ""
      ) : (
        err
      )}
    </div>
  );
}
