import API from "../config/apiClient.js";

export const getParcelInfos = () => API.post("/orderParcel");
export const getCheckStatus = async (number) => API.get(`/getCheckStatus/${number}`);
export const getParcels = async () => API.get("/getParcels");
