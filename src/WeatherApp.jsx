import React, { useState, useEffect } from "react";
import search from "./Img/Icons/search.png";
import right from "./Img/Icons/right.png";
import humidity from "./Img/Icons/humidity.png";
import eye from "./Img/Icons/visibility.png";
import pressure from "./Img/Icons/pressure.png";
import sunrise from "./Img/Icons/sunrise.png";
import sunset from "./Img/Icons/sunset.png";
import moonrise from "./Img/Icons/moonrise.png";
import moonset from "./Img/Icons/moonset.png";
import wind from "./Img/Icons/wind.png";
import rain from "./Img/Icons/rain.png";
import snow from "./Img/Icons/snow.png";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "039bd13ef4a1452a848141113230111";

  useEffect(() => {

    if (weatherData) {
      const conditionText = weatherData.current.condition.text.toLowerCase();

      if (conditionText === "overcast") {
        document.body.style.backgroundImage =
          "url(https://c1.wallpaperflare.com/path/140/976/894/storm-clouds-clouds-thunderstorm-grey-83eac31a28356c0dd8927ee351f872a1.jpg)";
      } else if (conditionText === "clear") {
        document.body.style.backgroundImage =
          "url(https://c1.wallpaperflare.com/path/804/778/325/sky-background-nature-blue-d2b0b374fa696973b2d722f6642e8376.jpg)";
      } else if (conditionText === "light drizzle") {
        document.body.style.backgroundImage =
          "url(https://r4.wallpaperflare.com/wallpaper/132/51/822/cloud-rain-raining-sad-wallpaper-327b4ae532ce79023de6c8560176adab.jpg)";
      } else if (conditionText === "mist") {
        document.body.style.backgroundImage =
          "url(https://r4.wallpaperflare.com/wallpaper/300/123/668/bridge-mist-queensboro-bridge-new-york-city-wallpaper-e6193429d9db068d867447d6219dbc5d.jpg)";
      } else if (conditionText === "light snow") {
        document.body.style.backgroundImage =
          "url(https://c0.wallpaperflare.com/path/913/966/482/nyc-new-york-christmas-snow-ee3ed30e37a8fcd682e67b5e70438e97.jpg)";
      } else if (conditionText === "partly cloudy") {
        document.body.style.backgroundImage =
          "url(https://images.unsplash.com/photo-1610578819722-edcb2e9f7c4f?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
      } else if (conditionText === "sunny") {
        document.body.style.backgroundImage =
          "url(https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)";
      } else if (conditionText === "fog") {
        document.body.style.backgroundImage =
          "url(https://wallpapercave.com/wp/wp4560328.jpg)";
      } else {
        // Reset background image for other conditions
        document.body.style.backgroundImage =
          "url(https://img.freepik.com/free-photo/beautiful-natural-view-landscape_23-2150788082.jpg?t=st=1706014277~exp=1706017877~hmac=d564301c22a171ad684bb7d6359291982a58cb76f812952bba5518f6036d288c&w=826)";
      }

      document.body.style.backgroundSize = "cover";
    }
  }, [weatherData]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=039bd13ef4a1452a848141113230111&q=${city}&days=7&aqi=no&alerts=no`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getConditionIcon = (iconUrl) => {
    return iconUrl;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="main">
      <div className="top">
        <h1 className="weather">Weather</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            className="inp"
            type="text"
            placeholder="search..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="search">
            <img src={search} alt="" />
          </button>
        </form>
      </div>

      {weatherData && weatherData.location && (
        <div className="country">
          <h2 className="state">{weatherData.location.country}</h2>
          <h2 className="city">
            {weatherData.location.name}
            <img src={right} alt="arrow" />
            {weatherData.current.temp_c}°C
          </h2>
          <p className="time">{weatherData.location.localtime}</p>

          <p className="condition">
            {weatherData.current.condition.text}
            {weatherData.current.condition.icon && (
              <img
                className="icon"
                src={getConditionIcon(weatherData.current.condition.icon)}
                alt="weather icon"
              />
            )}
          </p>
          <div className="in-info">
            <div className="info">
              <div className="humidity-info">
                <img className="humidity-icon" src={humidity} alt="icon" />
                <p className="humidity">{weatherData.current.humidity}%</p>
              </div>
              <div className="vis-km">
                <img className="eye-icon" src={eye} alt="icon" />
                <p className="vis">{weatherData.current.vis_km} km</p>
              </div>

              <div className="pressure-info">
                <img className="pressure-icon" src={pressure} alt="icon" />
                <p className="pressure">{weatherData.current.pressure_mb}</p>
              </div>
              <div className="wind-box">
                <p className="wind">
                  <img className="wind-icon" src={wind} alt="" />
                  {weatherData.current.wind_mph} mph
                </p>
              </div>
            </div>

            <div className="info-2">
              <div className="sunrise-box">
                <img className="sun-icon" src={sunrise} alt="icon" />
                <p className="sunrise">
                  {weatherData.forecast.forecastday[0].astro.sunrise}
                </p>
              </div>
              <div className="sunset-box">
                <img className="sun-icon" src={sunset} alt="icon" />
                <p className="sunset">
                  {weatherData.forecast.forecastday[0].astro.sunset}
                </p>
              </div>

              <div className="moonrise-box">
                <img className="moon-icon" src={moonrise} alt="icon" />
                <p className="moonrise">
                  {weatherData.forecast.forecastday[0].astro.moonrise}
                </p>
              </div>
              <div className="moonset-box">
                <img className="moon-icon" src={moonset} alt="icon" />
                <p className="moonset">
                  {weatherData.forecast.forecastday[0].astro.moonset}
                </p>
              </div>
            </div>

            <div className="rain-or-snow">
              <div className="rain-box">
                <img className="rain-icon" src={rain} alt="icon" />
                <p className="rain">
                  Chance of Rain:{" "}
                  {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}
                  %
                </p>
              </div>

              <div className="snow-box">
                <img className="snow-icon" src={snow} alt="icon" />
                <p className="snow">
                  Chance of Snow:
                  {weatherData.forecast.forecastday[0].day.daily_chance_of_snow}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
