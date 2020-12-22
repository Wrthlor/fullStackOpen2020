import React from "react";

const Weather = ( props ) => {
  const weatherData = props.weatherInfo;

  if (weatherData) {
    const weatherIcon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

    return (
      <div>
        <h2>Weather in {weatherData.name}</h2>
        <p><b>Temperature:</b> {weatherData.main.temp}° Celsius</p>
        <img 
          src={weatherIcon} 
          alt={`Weather icon id of ${weatherData.name}`} 
          width="100px"
        />
        <p><b>Wind:</b> {weatherData.wind.speed} m/s at {weatherData.wind.deg} degrees</p>
      </div>
    )
  }
  return null;
};

export default Weather;