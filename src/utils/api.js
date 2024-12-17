const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error sending fetch request: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export { checkResponse, request };
