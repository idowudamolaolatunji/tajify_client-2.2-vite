import axios from "axios";
import jwtDecode from "jwt-decode";
import { State } from "../../context/AuthProvider";
import { useNavigate } from "react-router";

const apiUrl = process.env.REACT_APP_API_URL;

const useAxios = () => {
  const { setToken, token, setUser, logOut } = State();

  //const navigate=useNavigate()

  const API = axios.create({ withCredentials: true, baseURL: apiUrl });

  API.interceptors.request.use(async (req) => {
    if (!token) return req;

    try {
      const { data } = await axios.get(`${apiUrl}/refresh`, {
        withCredentials: true,
      });
      console.log(data);
      req.headers.Authorization = `${data.user_token}`;
      localStorage.setItem("token", JSON.stringify(data.user_token));

      return req;
    } catch (error) {
      if (error.response.data.message === "No Cookie Found") {
        logOut();
        console.log(error.response.data);
        return req;
      }
    }
  });
  return API;
};

export default useAxios;
