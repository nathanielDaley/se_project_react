import sunny from "../../assets/sunny.png";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temperature}°F</p>
      <img src={sunny} alt="" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
