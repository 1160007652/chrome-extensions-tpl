/**
 * http请求的统一出口，方便统一处理，暂时透传。
 */
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
  retries: 3, // 重链请求次数
  retryDelay: (retryCount) => {
    return retryCount * 1000; // 重复请求延迟
  },
  retryCondition: (error) => {
    //true为打开自动发送请求，false为关闭自动发送请求
    return true;
  },
});

axios.defaults.headers.common.timeout = 10000;

// 处理统一处理
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
