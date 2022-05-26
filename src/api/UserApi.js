import axiosClient from "./AxiosClient";

class UserAPI {

  getUserInfo = (params) => {
    console.log(params)
    const url = `http://localhost:3001/api/user/${params}`;
    return axiosClient.get(url, {});
  };

  updateUser = (params) => {
    const url = "http://localhost:3001/api/user/update";

    return axiosClient.post(url, params);
  };
  unFollow = (params) => {
    console.log(params);
    const url = `http://localhost:3001/api/user/user/${params}/unfollow`;
    return axiosClient.patch(url, {});
  };
  getListFollowings = (params) => {

    const url = "http://localhost:3001/api/list-followings";
    return axiosClient.get(url, params);
  };
  getAllPost = (params) => {
    const url = "http://localhost:3001/api/posts";
    return axiosClient.get(url, params);
  };
  getPostsByUserId = (params) => {
    const url = `http://localhost:3001/api/posts/user/${params}`;
    return axiosClient.get(url, {});
  };
  getAllUsers = (params) => {
    const url = "http://localhost:3001/api/user/users/getAllUsers";
    return axiosClient.get(url);
  };

}

const userAPI = new UserAPI();

export default userAPI;
