import { login as apiLogin, register as apiRegister } from "../api/auth";

export async function register(name, email, password) {
  const res = await apiRegister({
    name,
    email,
    password,
  });

  return res.data;
}

export async function login(email, password) {
  const res = await apiLogin({
    email,
    password,
  });

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}