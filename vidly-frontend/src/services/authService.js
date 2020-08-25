import http from "./httpService";

const tokenKey = "auth";
const apiEndpoint = "/auth";

export function setToken(token) {
  localStorage.setItem(tokenKey, token);
}

export function login(username, password) {
  return http.post(apiEndpoint, {
    email: username,
    password: password,
  });
}
