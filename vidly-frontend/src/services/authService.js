import http from "./httpService";

const tokenKey = "auth";
const apiEndpoint = "/auth";

function setToken(token) {
  localStorage.setItem(tokenKey, token);
}

export async function login(username, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email: username,
    password: password,
  });
  setToken(jwt);
}

export function loginWithJwt(jwt) {
  setToken(jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  logout,
  loginWithJwt,
};
