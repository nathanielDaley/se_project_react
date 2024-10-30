import { useState } from "react";
import "./App.css";
import Main from "../Main/Main.jsx";
import Header from "../Header/Header.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });

  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Main weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
