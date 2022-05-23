import axiosClient from "./AxiosClient";

class notificationAPI {
  getNotification = () => {
    const url = "http://localhost:3001/api/noti/getNoti";
    return axiosClient.get(url, {});
  };

  createNotification = (params) => {
    const url = "http://localhost:3001/api/noti/createNoti";
    console.log(params);
    return axiosClient.post(url, params);
  };

  seenNotification = () => {
    const url = "http://localhost:3001/api/noti/seenNoti";
    return axiosClient.patch(url, {});
  };
}

const NotificationAPI = new notificationAPI();
export default NotificationAPI;
