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
    return axiosClient.patch(url, { postId: params });
  };

  getPostById = (params) => {
    console.log(params)
    const url = `http://localhost:3001/api/posts/${params.postId}`;
    return axiosClient.get(url, {});
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

  handleLikeCmt = (params) => {
    const url = "http://localhost:3001/api/comments/ul/" + params;

    return axiosClient.put(url, {});
  };

  deleteCmt = (params) => {
    const url = "http://localhost:3001/api/comments/" + params.CmtId;

    return axiosClient.delete(url, {});
  };

  editCmt = (params) => {
    const url = "http://localhost:3001/api/comments/" + params.CmtId;
    return axiosClient.put(url, {});
  };

  unnFollowFriends = (params) => {
    const url = "http://localhost:3001/api/user/user/" + params + "/unfollow";
    return axiosClient.patch(url, { params });
  };

  followFriends = (params) => {
    const url = "http://localhost:3001/api/user/user/" + params + "/follow";
    return axiosClient.patch(url, { params });
  };

  getlistLike = (params) => {
    const url = "http://localhost:3001/api/user/users";
    return axiosClient.post(url, params);
  };
  createNewPost = (params) => {
    const url = "http://localhost:3001/api/posts/createPost";
    return axiosClient.post(url, params);
  };
  updatePost = (params) => {
    console.log(params)
    const url = "http://localhost:3001/api/posts/updatePost";
    return axiosClient.patch(url, params);
  };
  deletePost = (params) => {
    console.log(params)
    const url = "http://localhost:3001/api/posts/delete/" + params;
    return axiosClient.delete(url, {});
  }
}

const postAPI = new PostAPI();
export default postAPI;
