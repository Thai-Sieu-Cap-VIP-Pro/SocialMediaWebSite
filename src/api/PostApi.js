import axiosClient from "./AxiosClient";

class PostAPI {
  getPosts = (params) => {
    const url = "http://localhost:3001/api/posts";
    return axiosClient.get(url, params);
  };
}

const postAPI = new PostAPI();
export default postAPI;
