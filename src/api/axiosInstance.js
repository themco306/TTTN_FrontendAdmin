// import axios from "axios";
// import appUrl from "./appUrl";
// import store from "../state/store";

// const configInstance = {
//   baseURL: appUrl.baseURL,
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   }
// };

// const axiosInstance = axios.create(configInstance);

// // Set default token here
// const defaultToken = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwianRpIjoiNmM1YjdhNWYtYzlkOC00ZmI3LWI0Y2EtMDdlZmUwY2ZjNjhiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsImV4cCI6MTcxMTk1ODExOSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzA2MCIsImF1ZCI6IktoYW5oIn0.ScDbVjVm5Sax1ye35IC1mZDeLcWRPhXFoDC-eUupf0s";

// axiosInstance.interceptors.request.use(function (config) {
//   // Get token from store or use default token
//   const token = store.getState().authReducer.token || defaultToken;
//   // const token =  defaultToken;
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default axiosInstance;
// axiosInstance.js

import axios from "axios";
import appUrl from "./appUrl";
import store from "../state/store";

// Tạo một hàm để tạo ra một phiên bản mới của axios với cấu hình được truyền vào
const createAxiosInstance = (config) => {
  const instance = axios.create(config);

  // Thêm interceptor vào phiên bản mới tạo
  instance.interceptors.request.use(function (config) {
    // Lấy token từ store hoặc sử dụng token mặc định
    const token = store.getState().authReducer.token || config.defaultToken;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return instance;
};

// Cấu hình mặc định cho axiosInstance
const defaultConfig = {
  baseURL: appUrl.baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  // Token mặc định
  defaultToken: "your_default_token_here"
};

// Tạo phiên bản mới của axiosInstance
const axiosInstance = createAxiosInstance(defaultConfig);

export default axiosInstance;
