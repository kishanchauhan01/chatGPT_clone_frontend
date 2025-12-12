import axios from "axios";

// Create an instance with default settings
const instance = axios.create({
  // Vite uses import.meta.env to access .env variables
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Always send cookies
});

export default instance;
