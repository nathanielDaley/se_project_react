import { useEffect, useState } from "react";
import "./App.css";
import Main from "../Main/Main.jsx";
import Header from "../Header/Header.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import MobileModal from "../MobileModal/MobileModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import {
  getClothes,
  deleteClothes,
  addClothes,
} from "../../utils/clothesApi.js";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import { coordinates, weatherApiKey } from "../../utils/constants.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

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
  const [clothingItems, setClothingItems] = useState([]);

  const handleMobileClick = () => {
    setActiveModal("mobile");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCloseItemModal = () => {
    closeActiveModal();

    //reset the selected card after the close transition completes
    //so a broken image link doesn't appear
    setTimeout(() => {
      setSelectedCard({});
    }, 400);
  };

  const handleAddGarmentClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteGarmentClick = (evt) => {
    evt.preventDefault();

    setActiveModal("delete");
  };

  const handleDeleteGarmentSubmit = (evt) => {
    evt.preventDefault();

    deleteClothes(selectedCard._id)
      .then((data) => {
        const newClothingItems = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );

        setClothingItems(newClothingItems);

        setSelectedCard({});

        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleToggleSwitchClick = () => {
    setTemperatureSwitchIsOn(!temperatureSwitchIsOn);
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const updateClothingItems = (data, method) => {
    const newClothingItems = [...clothingItems];

    newClothingItems[method](data);

    setClothingItems(newClothingItems);
  };

  useEffect(() => {
    getWeather(coordinates, weatherApiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        setWeatherData(filteredData);
      })
      .catch(console.error);

    getClothes()
      .then((data) => {
        setClothingItems(data.clothingItems);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return; //stops the useEffect from continuing if there is no active modal

    // define functions inside useEffect to not lose the reference on rerendering
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleModalOutsideClick = (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleModalOutsideClick);

    return () => {
      //add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleModalOutsideClick);
    };
  }, [activeModal]);

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
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={true}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddGarmentClick={handleAddGarmentClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          <Footer />
        </div>
        <AddItemModal
          closeActiveModal={closeActiveModal}
          activeModal={activeModal}
          addItem={addClothes}
          updateClothingItems={updateClothingItems}
        />
        <ItemModal
          handleCloseClick={handleCloseItemModal}
          activeModal={activeModal}
          card={selectedCard}
          handleDeleteGarmentClick={handleDeleteGarmentClick}
        />
        <MobileModal
          handleAddGarmentClick={handleAddGarmentClick}
          handleCloseClick={closeActiveModal}
          activeModal={activeModal}
        />
        <DeleteItemModal
          onCloseClick={handleCloseItemModal}
          activeModal={activeModal}
          onDeleteGarmentSubmit={handleDeleteGarmentSubmit}
        />
        <RegisterModal
          closeActiveModal={closeActiveModal}
          activeModal={activeModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
