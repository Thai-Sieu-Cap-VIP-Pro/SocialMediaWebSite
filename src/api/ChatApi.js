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
        const url = 'http://localhost:3001/api/user/contact';
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
};

export default ChatAPI;
