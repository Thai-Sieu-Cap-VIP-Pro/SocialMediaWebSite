import axiosClient from "./AxiosClient";

class AuthAPI {
  getAccount = (params) => {
    const url = "http://localhost:3001/api/auth/login";
    return axiosClient.post(url, params);
  };

  createAccount = (params) => {
    const url = "http://localhost:3001/api/auth/register";
    return axiosClient.post(url, params);
  };

  logout = (params) => {
    localStorage.removeItem("authTokens");
    const url = "api/auth/lout";
    return axiosClient.get(url, params);
  };
}

const authAPI = new AuthAPI();
export default authAPI;
