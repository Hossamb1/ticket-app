import axios from "axios";
const axiosInstance = axios.create({
  withCredentials: true, // Include credentials in cross-origin requests
});
const API_URL = "https://ticket-app-jade.vercel.app/api/users";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (user) => {
  // token error
  const response = await axiosInstance.post(`${API_URL}/login`, user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// Logout user
const logout = async () => {
  await localStorage.removeItem("user");
};
const authService = {
  register,
  logout,
  login,
};

export default authService;
