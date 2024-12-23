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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

import {
  getClothes,
  deleteClothes,
  addClothes,
  unlikeClothes,
  likeClothes,
} from "../../utils/clothesApi.js";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import { coordinates, weatherApiKey } from "../../utils/constants.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";
import * as auth from "../../utils/auth";
import { getToken, setToken } from "../../utils/token.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { updateUser } from "../../utils/userApi.js";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const updateClothingItems = (data, method) => {
    const newClothingItems = [...clothingItems];

    newClothingItems[method](data);

    setClothingItems(newClothingItems);
  };

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

  const handleDeleteGarmentClick = (event) => {
    event.preventDefault();

    setActiveModal("delete");
  };

  const handleDeleteGarmentSubmit = (event) => {
    event.preventDefault();

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

  const handleToggleLikeGarment = ({ id, isLiked }) => {
    isLiked
      ? unlikeClothes(id)
          .then((updatedGarment) => {
            setClothingItems((cards) =>
              cards.map((item) =>
                item._id === id ? updatedGarment.clothingItem : item
              )
            );
          })
          .catch(console.error)
      : likeClothes(id)
          .then((updatedGarment) => {
            setClothingItems((cards) =>
              cards.map((item) =>
                item._id === id ? updatedGarment.clothingItem : item
              )
            );
          })
          .catch(console.error);
  };

  const handleSignupClick = (event) => {
    event.preventDefault();

    setActiveModal("register");
  };

  const handleLogInClick = (event) => {
    event.preventDefault();

    setActiveModal("login");
  };

  const handleEditProfileClick = (event) => {
    event.preventDefault();

    setActiveModal("edit-profile");
  };

  const handleLogoutClick = (event) => {
    event.preventDefault();

    localStorage.removeItem("jwt");

    setIsLoggedIn(false);
  };

  const handleToggleSwitchClick = () => {
    setTemperatureSwitchIsOn(!temperatureSwitchIsOn);
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  const handleRegistration = ({
    username,
    avatar,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      auth.register(username, avatar, email, password).then(() => {
        setIsLoggedIn(true);
        closeActiveModal();
      });
    }
  };

  const handleAlternativeRegisterClick = () => {
    setActiveModal("login");
  };

  const handleLogin = ({ email, password }) => {
    auth.authorize(email, password).then((data) => {
      setToken(data.token);

      auth
        .validateLogin(data.token)
        .then((data) => {
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          closeActiveModal();
        })
        .catch(console.error);
    });
  };

  const handleAlternativeLoginClick = () => {
    setActiveModal("register");
  };

  const handleEditProfile = ({ username, avatar }) => {
    updateUser(username, avatar)
      .then((data) => {
        const updatedUser = currentUser;
        updatedUser.name = data.name;
        updatedUser.avatar = data.avatar;

        setCurrentUser(updatedUser);

        closeActiveModal();
      })
      .catch(console.error);
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

    const jwt = getToken();

    if (!jwt) {
      return;
    }

    auth
      .validateLogin(jwt)
      .then((data) => {
        setCurrentUser(data.user);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return; //stops the useEffect from continuing if there is no active modal

    // define functions inside useEffect to not lose the reference on rerendering
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleModalOutsideClick = (event) => {
      if (event.target.classList.contains("modal_opened")) {
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
        <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
          <div className="app__content">
            <div className="app__container">
              <Header
                handleMobileClick={handleMobileClick}
                handleAddGarmentClick={handleAddGarmentClick}
                handleSignupClick={handleSignupClick}
                handleLogInClick={handleLogInClick}
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
                      onToggleLike={handleToggleLikeGarment}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        handleCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        handleAddGarmentClick={handleAddGarmentClick}
                        handleEditProfileClick={handleEditProfileClick}
                        handleLogoutClick={handleLogoutClick}
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
            onSubmit={handleRegistration}
            onAlternative={handleAlternativeRegisterClick}
          />
          <LoginModal
            closeActiveModal={closeActiveModal}
            activeModal={activeModal}
            onSubmit={handleLogin}
            onAlternative={handleAlternativeLoginClick}
          />
          <EditProfileModal
            closeActiveModal={closeActiveModal}
            activeModal={activeModal}
            onSubmit={handleEditProfile}
          />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
