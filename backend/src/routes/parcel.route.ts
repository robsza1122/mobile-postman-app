import { Router } from "express";
import {
  assignParcelsHandler,
  checkStatusHandler,
  getParcelsHandler,
  inDeliveryEmailHandler,
  loginHandler,
  logoutHandler,
  orderedParcelHandler,
  otherResultHandler,
  refreshHandler,
  registerHandler,
  showUsersHandler,
  addInDeliveryStatusHandler,
  markParcelHandler,
  deliveredStatusHandler,
  markingOnTrueInBookHandler,
  markingOnFalseInBookHandler,
  deleteBookHandler,
  clearDatesHandler,
  advicedStatusHandler,
  failedDeliveryCodeHandler,
  markingOnTrueInListHandler,
  markingOnFalseInListHandler,
} from "../controllers/parcel.controller";
import { saveParcelsToUserHandler } from "../controllers/user.controller";

const postRoutes = Router();

postRoutes.post("/orderParcel", orderedParcelHandler);
postRoutes.get("/getParcels", getParcelsHandler);
postRoutes.post("/register", registerHandler);
postRoutes.post("/login", loginHandler);
postRoutes.get("/logout", logoutHandler);
postRoutes.get("/refresh", refreshHandler);
postRoutes.post("/checkStatus/:id", checkStatusHandler);
postRoutes.post("/addDeliveredStatus", deliveredStatusHandler);
postRoutes.post("/addAdvicedStatus", advicedStatusHandler);
postRoutes.post("/addOtherStatus", otherResultHandler); 
postRoutes.post("/sendInDeliveryEmail/:id", inDeliveryEmailHandler);
postRoutes.get("/showAllUsers", showUsersHandler);
postRoutes.post("/handleFailedDeliveryCode", failedDeliveryCodeHandler);

postRoutes.post("/assignParcelsToUser", assignParcelsHandler);
postRoutes.post("/saveParcelsToUser", saveParcelsToUserHandler);
postRoutes.post("/addInDeliveryStatus", addInDeliveryStatusHandler);
postRoutes.post("/markParcel", markParcelHandler);
postRoutes.post("/markAllParcelsOnTrueForBook", markingOnTrueInBookHandler);
postRoutes.post("/markAllParcelsOnFalseForBook", markingOnFalseInBookHandler);
postRoutes.post("/markAllParcelOnTrueInList", markingOnTrueInListHandler);
postRoutes.post("/markAllParcelOnFalseInList", markingOnFalseInListHandler);
postRoutes.post("/deleteBook", deleteBookHandler);
postRoutes.post("/deleteAllDates", clearDatesHandler);

export default postRoutes; 
