import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:8000", 
  baseURL: "https://blogspace-ea27.onrender.com", 

});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
