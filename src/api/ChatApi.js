import axios from 'axios';
import axiosClient from './AxiosClient';

const ChatAPI = {
    getAllConversations: () => {
        const url = 'http://localhost:3001/api/chat/getCon';
        return axiosClient.get(url);
    },
    createConversation: (params) => {
        const url = 'http://localhost:3001/api/chat/createCon';
        return axiosClient.post(url, params);
    },
    getUserContact: () => {
        const url = 'http://localhost:3001/api/user/chat/contact';
        return axiosClient.get(url);
    },
    createMessage: (params) => {
        const url = 'http://localhost:3001/api/chat/createMessage';
        return axiosClient.post(url, params);
    },
    getMessageInCon: (params) => {
        const url = `http://localhost:3001/api/chat/${params}`;
        return axiosClient.get(url);
    },
    getMembersInCon: (params) => {
        const url = `http://localhost:3001/api/chat/${params}/members`;
        return axiosClient.get(url);
    },
    deleteCon: (params) => {
        const url = `http://localhost:3001/api/chat/removeCon`;
        return axiosClient.delete(url, { data: params });
    },
    removeUserInCon: (params) => {
        const url = 'http://localhost:3001/api/chat/removeUser';
        return axiosClient.patch(url, params);
    },
    addUserInCon: (params) => {
        const url = 'http://localhost:3001/api/chat/addUser';
        return axiosClient.patch(url, params);
    },
    tymMessage: (params) => {
        const url = 'http://localhost:3001/api/chat/tymMessage';
        return axiosClient.patch(url, params);
    },
    unTymMessage: (params) => {
        const url = 'http://localhost:3001/api/chat/unTymMessage';
        return axiosClient.patch(url, params);
    },
    changeConName: (params) => {
        const url = `http://localhost:3001/api/chat/changeName/${params.id}`;
        return axiosClient.patch(url, {newName: params.newName});
    },
};

export default ChatAPI;
