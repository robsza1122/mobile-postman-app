import API from "../config/apiClient.ts";
import { CreateParcelOrder } from "../types/parcel.type.ts";
import {
  assignParcelsToUserType,
  deleteBookType,
  failedDeliveryCodeType,
  inDeliveryStatusType,
  leaveParcelOnPostBranchType,
  loginUserType,
  markAllParcelOnFalseOrTrueInListType,
  markParcelType,
} from "../types/status.type.ts";
import {
  multiAdvicedStatusType,
  multiDeliverStatusType,
  multiResultsType,
  deliveryStatusType,
  advicedStatusObjectType,
  otherResultStatusType,
} from "../utils/helpers/statusObjects.ts";

// Getting info about parcels
export const getParcels = async () => API.get("/getParcels");
export const getParcelInfos = () => API.post("/orderParcel");

//Infos about status
export const getCheckStatus = async (id: string | undefined): Promise<CreateParcelOrder> =>
  API.post(`/checkStatus/${id}`);

// Adding multi statuses
export const multiDeliveryStatus = async (data: multiDeliverStatusType) =>
  API.post("/multiDelivery", data);
export const multiAdvicingStatus = async (data: multiAdvicedStatusType) =>
  API.post("/multiAdvicing", data);
export const multiResultsStatus = async (data: multiResultsType) =>
  API.post("/multiResults", data);

// Adding statuses
export const getInDeliveryStatus = async (data: inDeliveryStatusType) =>
  API.post("/addInDeliveryStatus", data);
export const addDeliveredStatus = async (data: deliveryStatusType) =>
  API.post("/addDeliveredStatus", data);
export const addAdvicedStatus = async (data: advicedStatusObjectType) =>
  API.post("/addAdvicedStatus", data);
export const addOtherResult = async (data: otherResultStatusType) =>
  API.post("/addOtherStatus", data);
export const handleFailedDeliveryCode = async (data: failedDeliveryCodeType) =>
  API.post("/handleFailedDeliveryCode", data);
export const leaveParcelOnPostBranch = async (data: leaveParcelOnPostBranchType) =>
  API.post("/leaveParcelOnPostBranch", data);

// Handling user authentication
export const loginUser = async (data: loginUserType) =>
  API.post("/login", data);
export const logoutUser = async () => API.get("/logout");
export const showAllUsers = async () => API.get("/showAllUsers");

// Handling email sender
export const sendInDeliveryEmail = async (id: string) =>
  API.post(`/sendInDeliveryEmail/${id}`);

//Handling parcel marker
export const markAllOnTrue = async () =>
  API.post("/markAllParcelsOnTrueForBook");
export const markAllOnFalse = async () =>
  API.post("/markAllParcelsOnFalseForBook");
export const markAllParcelOnTrueInList = async (
  data: markAllParcelOnFalseOrTrueInListType,
) => API.post("/markAllParcelOnTrueInList", data);
export const markAllParcelOnFalseInList = async (
  data: markAllParcelOnFalseOrTrueInListType,
) => API.post("/markAllParcelOnFalseInList", data);
export const markParcelVERIFICATION = async (data: markParcelType) =>
  API.post("/markParcelVERIFICATION", data);
export const markParcel = async (data: any) =>
  API.post("/markParcel", data);
export const removingParcelsVERIFICATION = async (
  data: markAllParcelOnFalseOrTrueInListType,
) => API.post("/removingParcelsVERIFICATION", data);

// Handling book creator
export const assignParcelsToUser = async (data: assignParcelsToUserType) =>
  API.post("/assignParcelsToUser", data);
export const deleteDeliveryBook = async (data: deleteBookType) =>
  API.post("/deleteBook", data);
export const deleteAllDates = async () => API.post("/deleteAllDates");

//protected routes
export const getUser = async () => API.get("/user");
export const getSessions = async () => API.get("/sessions");
