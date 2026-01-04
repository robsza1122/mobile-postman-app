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
  markParcelInVerificationHandler,
  removeParcelsInVerificationHandler,
  multiDeliveryHandler,
  multiAdvicingHandler,
} from "../controllers/parcel.controller";
import { saveParcelsToUserHandler } from "../controllers/user.controller";

const postRoutes = Router();

postRoutes.post("/orderParcel", orderedParcelHandler);
postRoutes.get("/getParcels", getParcelsHandler);

// Handling user 
postRoutes.post("/register", registerHandler);
postRoutes.post("/login", loginHandler);
postRoutes.get("/logout", logoutHandler);
postRoutes.get("/refresh", refreshHandler);
postRoutes.get("/showAllUsers", showUsersHandler);

// Displaying status in email
postRoutes.post("/checkStatus/:id", checkStatusHandler);
postRoutes.post("/sendInDeliveryEmail/:id", inDeliveryEmailHandler);

// Adding status to parcel
postRoutes.post("/addDeliveredStatus", deliveredStatusHandler);
postRoutes.post("/addAdvicedStatus", advicedStatusHandler);
postRoutes.post("/addOtherStatus", otherResultHandler); 
postRoutes.post("/handleFailedDeliveryCode", failedDeliveryCodeHandler);
postRoutes.post("/addInDeliveryStatus", addInDeliveryStatusHandler);

// MULTI STATUS HANDLER
postRoutes.post("/multiDelivery", multiDeliveryHandler);
postRoutes.post("/multiAdvicing", multiAdvicingHandler);

//Creating new book
postRoutes.post("/assignParcelsToUser", assignParcelsHandler);
postRoutes.post("/saveParcelsToUser", saveParcelsToUserHandler);
postRoutes.post("/deleteBook", deleteBookHandler);

//Marking parcels in different places
postRoutes.post("/markParcel", markParcelHandler);
postRoutes.post("/markAllParcelsOnTrueForBook", markingOnTrueInBookHandler);
postRoutes.post("/markAllParcelsOnFalseForBook", markingOnFalseInBookHandler);
postRoutes.post("/markAllParcelOnTrueInList", markingOnTrueInListHandler);
postRoutes.post("/markAllParcelOnFalseInList", markingOnFalseInListHandler);
postRoutes.post("/markParcelVERIFICATION", markParcelInVerificationHandler);
postRoutes.post("/removingParcelsVERIFICATION", removeParcelsInVerificationHandler);

//Deleting all dates
postRoutes.post("/deleteAllDates", clearDatesHandler);

export default postRoutes; 
