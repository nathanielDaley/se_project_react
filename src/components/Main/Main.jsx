import "./Main.css";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, onToggleLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temperature[currentTemperatureUnit]}°{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  handleCardClick={handleCardClick}
                  onToggleLike={onToggleLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
