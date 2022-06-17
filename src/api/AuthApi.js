import axiosClient from './AxiosClient';
import { URL } from '../const/index';

class AuthAPI {
    getAccount = (params) => {
        const url = URL + '/auth/login';
        return axiosClient.post(url, params);
    };

    createAccount = (params) => {
        const url = URL + '/auth/register';
        return axiosClient.post(url, params);
    };

    logout = (params) => {
        const url = URL + '/auth/logout';
        return axiosClient.post(url, params);
    };
}

const authAPI = new AuthAPI();
export default authAPI;
