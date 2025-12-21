import API from "../config/apiClient.js";

export const getParcelInfos = () => API.post("/orderParcel");
export const getCheckStatus = async (id) => API.post(`/checkStatus/${id}`);
export const getInDeliveryStatus = async (data) =>
  API.post("/addInDeliveryStatus", data);
export const getParcels = async () => API.get("/getParcels");
export const loginUser = async (data) => API.post("/login", data);
export const logoutUser = async () => API.get("/logout");
export const addDeliveredStatus = async (data) =>
  API.post("/addDeliveredStatus", data);
export const addAdvicedStatus = async (data) =>
  API.post("/addAdvicedStatus", data);
export const addOtherResult = async (data) => API.post("/addOtherStatus", data);
export const sendInDeliveryEmail = async (id) =>
  API.post(`/sendInDeliveryEmail/${id}`);
export const showAllUsers = async () => API.get("/showAllUsers");
export const assignParcelsToUser = async (data) =>
  API.post("/assignParcelsToUser", data);
export const saveParcelsInMemory = async (data) =>
  API.post("/saveParcelsToUser", data);
export const deleteAllDates = async () => API.post("/deleteAllDates");
export const markParcel = async (data) => API.post("/markParcel", data);
export const deleteDeliveryBook = async (data) => API.post("/deleteBook", data);
export const markAllOnTrue = async () =>
  API.post("/markAllParcelsOnTrueForBook");
export const markAllOnFalse = async () =>
  API.post("/markAllParcelsOnFalseForBook");
export const markAllParcelOnTrueInList = async (data) =>
  API.post("/markAllParcelOnTrueInList", data);
export const markAllParcelOnFalseInList = async (data) =>
  API.post("/markAllParcelOnFalseInList", data);
export const handleFailedDeliveryCode = async (data) =>
  API.post("/handleFailedDeliveryCode", data);
//protected routes

export const getUser = async () => API.get("/user");
export const getSessions = async () => API.get("/sessions");
