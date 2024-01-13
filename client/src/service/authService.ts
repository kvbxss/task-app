import axios from "axios";

const API_BASE_URL = "http://localhost:4200";

const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return token;
  },
};

export default authService;
