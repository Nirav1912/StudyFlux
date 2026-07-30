import axios from "axios";

const API = "http://localhost:5000/api/tests";

export const saveTestResult = (data) => {
  return axios.post(`${API}/save`, data);
};

export const getUserTests = (userId) => {
  return axios.get(`${API}/${userId}`);
};