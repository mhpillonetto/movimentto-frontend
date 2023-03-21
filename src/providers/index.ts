import axios from "axios";
import { useNavigate } from "react-router-dom";
import Constants from '../data/constants'
import { logout } from "../services/Auth/logout";

const serviceURI = Constants.serviceURI

export const http_auth = axios.create({
  baseURL: serviceURI,
  headers: {
    "Content-type": "application/json"
  }
});

export const http = axios.create({
  baseURL: serviceURI,
  headers: {
    "Content-type": "application/json",
    // Authorization: `Bearer ${localStorage.getItem("jwt")}`
  }
})


http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {

    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = false;
        try {
          const rs = await http_auth.get("/refresh", {
            headers: { refreshToken: localStorage.getItem("refreshToken") },
          });

          const accessToken = rs.data.accessToken;
          originalConfig.headers["Authorization"] = `Bearer ${accessToken}`;

          localStorage.setItem("accessToken", accessToken);

          return http(originalConfig);
        } catch (_error) {
          logout();
          return Promise.reject(_error);
        }
      }
    }
    console.log('====================================');
    console.log('saindo');
    console.log('====================================');
    logout();
    return Promise.reject(err);
  }
);