import axios from "axios";
import axiosClient from "./AxiosClient";
import { URL } from "../const/index";

const ChatAPI = {
  getAllConversations: () => {
    const url = URL + "/chat/getCon";
    return axiosClient.get(url);
  },
  createConversation: (params) => {
    const url = URL + "/chat/createCon";
    return axiosClient.post(url, params);
  },
  getUserContact: () => {
    const url = URL + "/user/chat/contact";
    return axiosClient.get(url);
  },
  createMessage: (params) => {
    const url = URL + "/chat/createMessage";
    return axiosClient.post(url, params);
  },
  getMessageInCon: (params) => {
    const url = `${URL}/chat/${params.id}?page=${params.page}`;
    return axiosClient.get(url);
  },
  getMembersInCon: (params) => {
    const url = `${URL}/chat/${params}/members`;
    return axiosClient.get(url);
  },
  deleteCon: (params) => {
    const url = `${URL}/chat/removeCon`;
    return axiosClient.delete(url, { data: params });
  },
  removeUserInCon: (params) => {
    const url = URL + "/chat/removeUser";
    return axiosClient.patch(url, params);
  },
  addUserIntoCon: (params) => {
    const url = URL + "/chat/addUser";
    return axiosClient.patch(url, params);
  },
  tymMessage: (params) => {
    const url = URL + "/chat/tymMessage";
    return axiosClient.patch(url, params);
  },
  unTymMessage: (params) => {
    const url = URL + "/chat/unTymMessage";
    return axiosClient.patch(url, params);
  },
  changeConName: (params) => {
    const url = `${URL}/chat/changeName/${params.id}`;
    return axiosClient.patch(url, { newName: params.newName });
  },
  changeConAvt: (params) => {
    const url = `${URL}/chat/changeAvatar/${params.id}`;
    return axiosClient.patch(url, { newAvt: params.newAvt });
  },
  deleteMessage: (params) => {
    const url = `${URL}/chat/deleteMessage/${params.id}`;
    return axiosClient.delete(url);
  },
  seenAllMessages: (params) => {
    const url = `${URL}/chat/seenAllMessages/${params.id}`;
    return axiosClient.patch(url, {});
  },
  seenMessage: (params) => {
    const url = `${URL}/chat/seenMessage`;
    return axiosClient.patch(url, { messId: params.messId });
  },
};

export default ChatAPI;
