import { BASE_URL, request } from "./api";
import { getToken } from "./token";

function getClothes() {
  return request(`${BASE_URL}/items`);
}

function addClothes({ name, weather, imageUrl }) {
  const token = getToken();

  if (!token) {
    return Promise.reject(`You are not authorized to perform that action.`);
  }

  const url = `${BASE_URL}/items`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  };
  return request(url, options);
}

function deleteClothes(id) {
  const token = getToken();

  if (!token) {
    return Promise.reject(`You are not authorized to perform that action.`);
  }

  const url = `${BASE_URL}/items/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  return request(url, options);
}

export { getClothes, addClothes, deleteClothes };
