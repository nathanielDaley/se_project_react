const baseUrl = "http://localhost:3001";
const baseHeaders = { "Content-Type": "application/json" };

const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error sending fetch request: ${res.status}`);
};

function getClothes() {
  return fetch(`${baseUrl}/items`).then(_checkResponse);
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
  return fetch(url, options).then(_checkResponse);
}

function deleteClothes(id) {
  const url = `${baseUrl}/items/${id}`;
  const options = {
    method: "DELETE",
    headers: baseHeaders,
  };
  return fetch(url, options).then(_checkResponse);
}

export { getClothes, addClothes, deleteClothes };
