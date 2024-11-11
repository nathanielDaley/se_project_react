import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch({ leftLabel, rightLabel }) {
  const { switchIsOn, handleToggleSwitchClick } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <>
      <input
        className="switch__checkbox"
        id={`react-switch-new`}
        type="checkbox"
        checked={switchIsOn}
        onChange={handleToggleSwitchClick}
      />
      <label className="switch__label" htmlFor={`react-switch-new`}>
        <span className={`switch__button`} />
        <p
          className={`switch__left-label ${
            !switchIsOn ? "switch__left-label_type_selected" : ""
          }`}
        >
          {leftLabel}
        </p>
        <p
          className={`switch__right-label ${
            switchIsOn ? "switch__right-label_type_selected" : ""
          }`}
        >
          {rightLabel}
        </p>
      </label>
    </>
  );
}

export default ToggleSwitch;
