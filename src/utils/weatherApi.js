const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error sending fetch request: ${res.status}`);
};

export const getWeather = (coordinates, weatherApiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${weatherApiKey}`
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temperature = {
    F: data.main.temp,
    C: (((data.main.temp - 32) * 5) / 9).toFixed(2),
  };
  result.type = getWeatherType(data.main.temp);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys);

  return result;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

const isDay = ({ sunrise, sunset }) => {
  const now = Date.now();

  //change seconds to milliseconds
  if (sunrise < 10000000000) {
    sunrise = sunrise * 1000;
  }
  if (sunset < 10000000000) {
    sunset = sunset * 1000;
  }

  return sunrise < now && now < sunset;
};
