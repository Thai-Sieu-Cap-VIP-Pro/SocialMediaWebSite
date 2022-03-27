import axiosClient from "./AxiosClient";


class ProductAPI {
  getAccount = (params) => {
    const url = "/login";
    return axiosClient.get(url, { params });
  };
}

const productAPI = new ProductAPI();
export default productAPI;
