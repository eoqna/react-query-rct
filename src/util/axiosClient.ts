import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://rnd.daontec.co.kr:8080",
  timeout: 10000,
});

export const initAxios = () => {
  axiosClient.defaults.headers.common.Authorization = undefined;
};

const getInstance = () => axiosClient;

export default getInstance();
