/// <reference types="vite/client" />
import axios from "axios";
import queryClient from "./queryClient";
import { UNAUTHORIZED } from "../constants/http.mjs";
import { navigate } from "../api/navigation";

const options = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4004",
  withCredentials: true,
};

// create a separate client for refreshing the access token
// to avoid infinite loops with the error interceptor
const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    if (status === 401) {
      try {
        const refreshResponse = await TokenRefreshClient.get("/refresh");
        // Store the new access token
        if (refreshResponse.accessToken) {
          localStorage.setItem("accessToken", refreshResponse.accessToken);
        }
        // @ts-ignore
        config.headers.Authorization = `Bearer ${refreshResponse.accessToken}`;
        return API(config);
      } catch (error) {
        queryClient.clear();
        // @ts-ignore
        navigate("/login", {
          state: {
            redirectUrl: window.location.pathname,
          },
        });
      }
    }
    return Promise.reject({ status, ...data });
  },
);

export default API;
