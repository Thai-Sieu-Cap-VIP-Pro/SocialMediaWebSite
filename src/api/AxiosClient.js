import queryString from "query-string";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import axios from "axios";

const axiosClient = axios.create({
  headers: {
    "Content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (req) => {
  let authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  if (authTokens) {
    req.headers.Authorization = `Bearer ${authTokens.accessToken}`;
  }

  // const user = jwt_decode(authTokens.accessToken);

  // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  // console.log(isExpired);

  // if (!isExpired) return req;

  // const response = await axios.post(`/resfresh`, {
  //   resfresh: authTokens.refreshToken,
  // });

  // localStorage.setItem("authTokens", JSON.stringify(response.data));
  // req.headers.Authorization = `Bearer ${response.data.accessToken}`;

  return req;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    //handle error
    throw error;
  }
);

export default axiosClient;
