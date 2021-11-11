import axios from 'axios';

const service = axios.create({
  baseURL: 'http://192.168.1.103',
  withCredentials: true
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
