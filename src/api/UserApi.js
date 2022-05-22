import axiosClient from './AxiosClient';

class UserAPI {
  getUserById = (params) => {
    const url = `http://localhost:3001/api/user/${params}`;
    return axiosClient.get(url, params);
  };
  updateUser = (params) => {
    const url = 'http://localhost:3001/api/user/update';
    return axiosClient.post(url, params);
  };
  unFollow = (params) => {
    console.log(params);
    const url = `http://localhost:3001/api/user/user/${params}/unfollow`;
    return axiosClient.patch(url, {});
  };
  getListFollowings = (params) => {
    const url = 'http://localhost:3001/api/list-followings';
    return axiosClient.get(url, params);
  };
  getPostsById = (params) => {
    const url = `http://localhost:3001/api/posts/${params}`;
    return axiosClient.get(url, params);
  };
}

const userAPI = new UserAPI();

export default userAPI;
