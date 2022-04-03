import axiosClient from "./AxiosClient";

class AuthAPI {
  getAccount = (params) => {
    const url = "api/auth/login";
    return axiosClient.post(url, params);
  };
}

const authAPI = new AuthAPI();
export default authAPI;
