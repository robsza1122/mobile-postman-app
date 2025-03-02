import API from "../config/apiClient.js";

export const getParcelInfos = () => API.post("/orderParcel");
export const getCheckStatus = async (number) => API.get(`/getCheckStatus/${number}`);
export const getParcels = async () => API.get("/getParcels");
export const loginUser = async (data) => API.post("/login", data);
export const logoutUser = async () => API.get("/logout");

//protected routes

export const getUser = async () => API.get("/user");
