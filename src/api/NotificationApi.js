import axiosClient from "./AxiosClient";
import { URL } from "../const/index";

class notificationAPI {
  getNotification = () => {
    const url = URL + "/noti/getNoti";
    return axiosClient.get(url, {});
  };

  createNotification = (params) => {
    const url = URL + "/noti/createNoti";
    console.log(params);
    return axiosClient.post(url, params);
  };

  seenNotification = (params) => {
    const url = URL + "/noti/seenNoti";
    return axiosClient.patch(url, params);
  };

  seenAllNotification = () => {
    const url = URL + "/noti/seenAllNoti";
    return axiosClient.patch(url, {});
  };
}

const NotificationAPI = new notificationAPI();
export default NotificationAPI;
