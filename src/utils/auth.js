import { BASE_URL, BASE_HEADERS, request } from "./api";

const register = (username, avatar, email, password) => {
  const url = `${BASE_URL}/signup`;
  const options = {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ name: username, avatar, email, password }),
  };

  return request(url, options);
};

const authorize = (email, password) => {
  const url = `${BASE_URL}/signin`;
  const options = {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ email, password }),
  };

  return request(url, options);
};

const validateLogin = (token) => {
  const url = `${BASE_URL}/users/me`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  return request(url, options);
};

export { register, authorize, validateLogin };
