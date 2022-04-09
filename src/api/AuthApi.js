import axios from "axios";
import axiosClient from "./AxiosClient";

class AuthAPI {
  getAccount = (params) => {
    const url = "api/auth/login";
    return axiosClient.post(url, params);
  };

  logout = () => {
    localStorage.removeItem("authTokens");
    const url = "api/auth/lout";
    return axios.get(url, params);
  };
}

const authAPI = new AuthAPI();
export default authAPI;
