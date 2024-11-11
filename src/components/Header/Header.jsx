import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar-default.png";
import openMobile from "../../assets/mobile-menu.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleMobileClick, handleAddGarmentClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
        <button
          onClick={handleAddGarmentClick}
          className="header__add-clothes-button"
          type="button"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__profile-link">
          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          </div>
        </Link>
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
