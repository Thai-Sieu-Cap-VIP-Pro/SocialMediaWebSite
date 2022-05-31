import axiosClient from "./AxiosClient";
import { URL } from "../const/index";

class UserAPI {
  getUserInfo = (params) => {
    console.log(params);
    const url = `${URL}/user/${params}`;
    return axiosClient.get(url, {});
  };

  updateUser = (params) => {
    const url = URL + "/user/update";

    return axiosClient.post(url, params);
  };
  unFollow = (params) => {
    console.log(params);
    const url = `${URL}/user/user/${params}/unfollow`;
    return axiosClient.patch(url, {});
  };
  removeFollow = (params) => {
    const url = `${URL}/user/user/${params}/remove-follow`;
    return axiosClient.patch(url, {});
  };
  getListFollowings = (params) => {
    const url = URL + "/list-followings";
    return axiosClient.get(url, params);
  };
  getAllPost = (params) => {
    const url = URL + "/posts";
    return axiosClient.get(url, params);
  };
  getPostsByUserId = (params) => {
    const url = `${URL}/posts/user/${params}`;
    return axiosClient.get(url, {});
  };
  getAllUsers = (params) => {
    const url = URL + "/user/users/getAllUsers";
    return axiosClient.get(url);
  };
  changePassword = (params) => {
    const url = URL + "/user/change-password";
    return axiosClient.post(url, params);
  };
}

const userAPI = new UserAPI();

export default userAPI;
