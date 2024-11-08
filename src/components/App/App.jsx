import { useEffect, useState } from "react";
import "./App.css";
import Main from "../Main/Main.jsx";
import Header from "../Header/Header.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import MobileModal from "../MobileModal/MobileModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import { coordinates, weatherApiKey } from "../../utils/constants.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temperature: 999,
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [temperatureSwitchIsOn, setTemperatureSwitchIsOn] = useState(false);

  const onAddItem = (values) => {
    console.log(values);
  };

  const handleMobileClick = () => {
    setActiveModal("mobile");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddGarmentClick = () => {
    setActiveModal("add-garment");
  };

  const handleToggleSwitchClick = () => {
    setTemperatureSwitchIsOn(!temperatureSwitchIsOn);
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, weatherApiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTemperatureUnit,
          switchIsOn: temperatureSwitchIsOn,
          handleToggleSwitchClick,
        }}
      >
        <div className="app__content">
          <div className="app__container">
            <Header
              handleMobileClick={handleMobileClick}
              handleAddGarmentClick={handleAddGarmentClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                  />
                }
              />
              <Route
                path="/profile"
                element={<Profile handleCardClick={handleCardClick} />}
              />
            </Routes>
          </div>

          <Footer />
        </div>
        <AddItemModal
          closeActiveModal={closeActiveModal}
          activeModal={activeModal}
          onAddItem={onAddItem}
        />
        <ItemModal
          handleCloseClick={closeActiveModal}
          activeModal={activeModal}
          card={selectedCard}
        />
        <MobileModal
          handleAddGarmentClick={handleAddGarmentClick}
          handleCloseClick={closeActiveModal}
          activeModal={activeModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
