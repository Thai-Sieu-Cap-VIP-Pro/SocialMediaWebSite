import axiosClient from "./AxiosClient";
import { URL } from "../const/index";
class PostAPI {
  getPosts = () => {
    const url = URL + "/home/post";
    return axiosClient.get(url, {});
  };

  getCommentByPostID = (params) => {
    const url = URL + "/comments/" + params;
    return axiosClient.get(url, {});
  };

  likePost = (params) => {
    const url = URL + "/posts/post/" + params + "/like";
    return axiosClient.patch(url, { postId: params });
  };

  getPostById = (params) => {
    console.log(params);
    const url = URL + "/posts/" + params.postId;
    return axiosClient.get(url, {});
  };

  unLikePost = (params) => {
    const url = URL + "/posts/post/" + params + "/unlike";
    return axiosClient.patch(url, {});
  };

  recommendFriends = () => {
    const url = URL + "/home/relate";
    return axiosClient.get(url, {});
  };

  addComment = (params) => {
    let url = "";
    if (params.commentId == null || params.commentId == "") {
      url = URL + "/comments/" + params.postId + "/";
    } else {
      url = URL + "/comments/" + params.postId + "/" + params.commentId;
    }

    let content = params.content;
    return axiosClient.post(url, { content });
  };

  handleLikeCmt = (params) => {
    const url = URL + "/comments/ul/" + params;

    return axiosClient.put(url, {});
  };

  deleteCmt = (params) => {
    const url = URL + "/comments/" + params.CmtId;

    return axiosClient.delete(url, {});
  };

  editCmt = (params) => {
    const url = URL + "/comments/" + params.CmtId;
    return axiosClient.put(url, {});
  };

  unnFollowFriends = (params) => {
    const url = URL + "/user/user/" + params + "/unfollow";
    return axiosClient.patch(url, { params });
  };

  followFriends = (params) => {
    const url = URL + "/user/user/" + params + "/follow";
    return axiosClient.patch(url, { params });
  };

  getlistLike = (params) => {
    const url = URL + "/user/users";
    return axiosClient.post(url, params);
  };
  createNewPost = (params) => {
    const url = URL + "/posts/createPost";
    return axiosClient.post(url, params);
  };
  updatePost = (params) => {
    console.log(params);
    const url = URL + "/posts/updatePost";
    return axiosClient.patch(url, params);
  };
  deletePost = (params) => {
    console.log(params);
    const url = URL + "/posts/delete/" + params;
    return axiosClient.delete(url, {});
  };
}

const postAPI = new PostAPI();
export default postAPI;
