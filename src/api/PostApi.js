import axiosClient from "./AxiosClient";

class PostAPI {
  getPosts = () => {
    const url = "http://localhost:3001/api/home/post";
    return axiosClient.get(url, {});
  };

  getCommentByPostID = (params) => {
    const url = "http://localhost:3001/api/comments/" + params;
    return axiosClient.get(url, {});
  };

  likePost = (params) => {
    const url = "http://localhost:3001/api/posts/post/" + params + "/like";
    return axiosClient.patch(url, {});
  };

  unLikePost = (params) => {
    const url = "http://localhost:3001/api/posts/post/" + params + "/unlike";
    return axiosClient.patch(url, {});
  };

  recommendFriends = () => {
    const url = "http://localhost:3001/api/home/relate";
    return axiosClient.get(url, {});
  };

  addComment = (params) => {
    console.log(params);
    // '/:postId/:commentId?'
    let url = "";
    if (params.commentId == null || params.commentId == "") {
      url = "http://localhost:3001/api/comments/" + params.postId + "/";
    } else {
      url =
        "http://localhost:3001/api/comments/" +
        params.postId +
        "/" +
        params.commentId;
    }

    let content = params.content;
    return axiosClient.post(url, { content });
  };
}

const postAPI = new PostAPI();
export default postAPI;
