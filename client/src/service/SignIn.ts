import axios from "axios";

const baseUrl = "http://localhost:4200";

const SignIn = async (login: string, password: string) => {
  const response = await axios.post(
    baseUrl + `/api/auth`,
    JSON.stringify({ login, password }),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  return response;
};

export default SignIn;
