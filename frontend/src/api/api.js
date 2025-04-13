import API from "../config/apiClient.js";

export const getParcelInfos = () => API.post("/orderParcel");
export const getCheckStatus = async (id) => API.post(`/checkStatus/${id}`);
export const getInDeliveryStatus = async () => API.post('/addInDeliveryStatus')
export const addDifferentStatus = async (data) => API.post("/addDifferentStatus", data)
export const getParcels = async () => API.get("/getParcels");
export const loginUser = async (data) => API.post("/login", data);
export const logoutUser = async () => API.get("/logout");

//protected routes

export const getUser = async () => API.get("/user");
export const getSessions = async () => API.get("/sessions");
