import { useContext } from "react";
import { weatherOptions } from "../../utils/constants";
import { defaultWeatherOptions } from "../../utils/constants";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherOption = weatherOptions.find((item) => {
    return (
      item.isDay == weatherData.isDay && item.condition == weatherData.condition
    );
  });

  // if there is no weather option that matches condition fetched from the weather
  // API grab from the default weather options
  const weatherOptionUrl = weatherOption
    ? weatherOption.url
    : weatherData.isDay
    ? defaultWeatherOptions.day.url
    : defaultWeatherOptions.night.url;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temperature[currentTemperatureUnit]}°
        {currentTemperatureUnit}
      </p>
      <img
        src={weatherOptionUrl}
        alt={`Card showing ${weatherData.condition} ${
          weatherData.isDay ? "day" : "night"
        } `}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
