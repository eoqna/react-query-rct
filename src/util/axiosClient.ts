import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000,
});

export const initAxios = () => {
  axiosClient.defaults.headers.common.Authorization = undefined;
};

const getInstance = () => axiosClient;

export default getInstance();
