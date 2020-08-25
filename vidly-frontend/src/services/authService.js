import http from "./httpService";
import jwtDecode from "jwt-decode";

const tokenKey = "auth";
const apiEndpoint = "/auth";

http.setAuthToken(getAuthToke());

function getAuthToke() {
    return localStorage.getItem(tokenKey);
}

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

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
}

export default {
    login,
    logout,
    loginWithJwt,
    getCurrentUser,
};
