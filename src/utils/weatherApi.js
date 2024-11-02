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
  result.temperature = data.main.temp;
  result.type = getWeatherType(data.main.temp);

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
