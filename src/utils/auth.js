import { BASE_URL, BASE_HEADERS, request } from "./api";

const register = (username, avatar, email, password) => {
  const url = `${BASE_URL}/auth/local/register`;
  const options = {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ username, avatar, email, password }),
  };

  return request(url, options);
};

const authorize = (username, password) => {
  const url = `${BASE_URL}/auth/local`;
  const options = {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ email, password }),
  };

  return request(url, options);
};

export { register, authorize };
