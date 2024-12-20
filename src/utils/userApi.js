import { BASE_URL, request } from "./api";
import { getToken } from "./token";

function updateUser(username, avatar) {
  const token = getToken();

  console.log(`${username} ${avatar}`);

  if (!token) {
    return Promise.reject(`You are not authorized to perform that action.`);
  }

  const url = `${BASE_URL}/users/me`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: username,
      avatar,
    }),
  };
  return request(url, options);
}

export { updateUser };
