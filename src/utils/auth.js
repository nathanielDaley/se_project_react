import { BASE_URL, BASE_HEADERS, request } from "./api";

const register = (username, avatar, email, password) => {
  const url = `${BASE_URL}/signup`;
  const options = {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ name: username, avatar, email, password }),
  };

  console.log(options);

  return request(url, options);
};

const authorize = (username, password) => {
  const url = `${BASE_URL}/signin`;
  const options = {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ email, password }),
  };

  return request(url, options);
};

export { register, authorize };
