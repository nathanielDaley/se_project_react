import { weatherOptions } from "../../utils/constants";
import { defaultWeatherOptions } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
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
      <p className="weather-card__temp">{weatherData.temperature}°F</p>
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
