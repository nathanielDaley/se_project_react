import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  switchIsOn: false,
  handleToggleSwitchClick: () => {},
});

export { CurrentTemperatureUnitContext };
