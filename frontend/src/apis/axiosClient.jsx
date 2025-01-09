// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:5000/api", // Thay đổi baseURL nếu cần
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add a request interceptor
// axiosClient.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     // Ví dụ: Thêm token vào header
//     // const token = localStorage.getItem('accessToken');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axiosClient.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response.data;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     // Ví dụ: Xử lý lỗi 401 Unauthorized
//     // if (error.response.status === 401) {
//     //   // Xóa token, chuyển hướng đến trang login
//     // }
//     return Promise.reject(error);
//   }
// );

// export default axiosClient;
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/auth', // Thay đổi baseURL nếu cần
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors (Optional) - Thêm token vào header cho các request
axiosClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;