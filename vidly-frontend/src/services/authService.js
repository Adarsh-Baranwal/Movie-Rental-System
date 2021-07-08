import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "http://localhost:3900/api/auth";

export async function login(email, password) {
  let { data } = await http.post(apiEndPoint, {
    email,
    password,
  });
  localStorage.setItem("token", data);
}
export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    let token = localStorage.getItem("token");
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export function loginwithjwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function getJWT() {
  return localStorage.getItem("token");
}
