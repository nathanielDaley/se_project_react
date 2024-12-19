import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar-default.png";
import openMobile from "../../assets/mobile-menu.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleMobileClick,
  handleAddGarmentClick,
  handleSignupClick,
  handleLogInClick,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__right-content">
        <ToggleSwitch leftLabel={"F"} rightLabel={"C"} />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddGarmentClick}
              className="header__add-clothes-button"
              type="button"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__profile-link">
              <div className="header__user-container">
                <p className="header__username">{currentUser.name}</p>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              </div>
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleSignupClick}
              className="header__signup-button"
              type="button"
            >
              Signup
            </button>
            <button
              onClick={handleLogInClick}
              className="header__log-in-button"
              type="button"
            >
              Log In
            </button>
          </>
        )}
      </div>
      <button onClick={handleMobileClick} className="header__mobile-button">
        <img
          src={openMobile}
          alt="open mobile modal"
          className="header__mobile-open-image"
        />
      </button>
    </header>
  );
}

export default Header;
