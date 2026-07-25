import axios from "axios";

const axiosWithJWT = axios.create();

axiosWithJWT.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default axiosWithJWT;
