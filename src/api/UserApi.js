import axios from 'axios';
import axiosClient from './AxiosClient';

const UserApi = {
    changeAvatar: (params) => {
        const url = 'http://localhost:3001/api/user/user/changeAvt';
        return axiosClient.patch(url, params);
    },

    getUserPosts: (params) => {
        const url = `http://localhost:3001/api/user/${params}`;
        return axiosClient.get(url);
    }
};

export default UserApi;
