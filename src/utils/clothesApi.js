import { BASE_URL, BASE_HEADERS, request } from "./api";

function getClothes() {
  return request(`${BASE_URL}/items`);
}

function addClothes({ name, weather, imageUrl }) {
  const url = `${BASE_URL}/items`;
  const options = {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  };
  return request(url, options);
}

function deleteClothes(id) {
  const url = `${BASE_URL}/items/${id}`;
  const options = {
    method: "DELETE",
    headers: BASE_HEADERS,
  };
  return request(url, options);
}

export { getClothes, addClothes, deleteClothes };
