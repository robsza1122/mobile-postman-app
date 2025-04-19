import API from "../config/apiClient.js";

export const getParcelInfos = () => API.post("/orderParcel");
export const getCheckStatus = async (id) => API.post(`/checkStatus/${id}`);
export const getInDeliveryStatus = async () => API.post('/addInDeliveryStatus')
export const getParcels = async () => API.get("/getParcels");
export const loginUser = async (data) => API.post("/login", data);
export const logoutUser = async () => API.get("/logout");
export const addDeliveredStatus = async (data) => API.post("/addDeliveredStatus", data);
export const addAdvicedStatus = async (data) => API.post("/addAdvicedStatus", data);
export const addOtherResult = async (data) => API.post("/addOtherResult", data);

//protected routes

export const getUser = async () => API.get("/user");
export const getSessions = async () => API.get("/sessions");
