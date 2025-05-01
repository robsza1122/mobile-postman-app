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
  markingOnTrueHandler,
  markingOnFalseHandler,
  deleteBookHandler,
  clearDatesHandler,
  advicedStatusHandler,
} from "../controllers/parcel.controller";

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

postRoutes.post("/assignParcelsToUser", assignParcelsHandler);
postRoutes.post("/addInDeliveryStatus", addInDeliveryStatusHandler);
postRoutes.post("/markParcel", markParcelHandler);
postRoutes.post("/markAllParcelsOnTrue", markingOnTrueHandler);
postRoutes.post("/markAllParcelsOnFalse", markingOnFalseHandler);
postRoutes.post("/deleteBook", deleteBookHandler);
postRoutes.post("/deleteAllDates", clearDatesHandler);

export default postRoutes; 
