import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const register = (data) =>
  API.post("/register", data);

export const login = (data) =>
  API.post("/login", data);

export const sendOtp = (email) =>
  API.post("/send-otp", { email });

export const verifyOtp = (email, otp) =>
  API.post("/verify-otp", {
    email,
    otp,
  });

export const resetPassword = (email, password) =>
  API.post("/reset-password", {
    email,
    password,
  });