const baseUrl = "http://localhost:3001";
const baseHeaders = { "Content-Type": "application/json" };
import { request } from "./api";

function getClothes() {
  return request(`${baseUrl}/items`);
}

function addClothes({ name, weather, imageUrl }) {
  const url = `${baseUrl}/items`;
  const options = {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  };
  return request(url, options);
}

function deleteClothes(id) {
  const url = `${baseUrl}/items/${id}`;
  const options = {
    method: "DELETE",
    headers: baseHeaders,
  };
  return request(url, options);
}

export { getClothes, addClothes, deleteClothes };
