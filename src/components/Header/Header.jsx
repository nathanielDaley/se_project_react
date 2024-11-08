import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar-default.png";
import openMobile from "../../assets/mobile-menu.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleMobileClick, handleAddGarmentClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch leftLabel={"F"} rightLabel={"C"} />
      <button
        onClick={handleAddGarmentClick}
        className="header__add-clothes-button"
        type="button"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
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
