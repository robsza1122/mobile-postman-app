import { Router } from "express";
import {
  assignParcelsHandler,
  checkStatusHandler,
  getParcelsHandler,
  inDeliveryEmailHandler,
  orderedParcelHandler,
  showUsersHandler,
  markParcelHandler,
  markingOnTrueInBookHandler,
  markingOnFalseInBookHandler,
  deleteBookHandler,
  clearDatesHandler,
  markingOnTrueInListHandler,
  markingOnFalseInListHandler,
  markParcelInVerificationHandler,
  removeParcelsInVerificationHandler,
} from "../controllers/parcel.controller";

const parcelRoutes = Router();

parcelRoutes.post("/orderParcel", orderedParcelHandler);
parcelRoutes.get("/getParcels", getParcelsHandler);

// Handling user
parcelRoutes.get("/showAllUsers", showUsersHandler);

// Displaying status in email
parcelRoutes.post("/checkStatus/:id", checkStatusHandler);
parcelRoutes.post("/sendInDeliveryEmail/:id", inDeliveryEmailHandler);

//Creating new book
parcelRoutes.post("/assignParcelsToUser", assignParcelsHandler);
parcelRoutes.post("/deleteBook", deleteBookHandler);

//Marking parcels in different places
parcelRoutes.post("/markParcel", markParcelHandler);
parcelRoutes.post("/markAllParcelsOnTrueForBook", markingOnTrueInBookHandler);
parcelRoutes.post("/markAllParcelsOnFalseForBook", markingOnFalseInBookHandler);
parcelRoutes.post("/markAllParcelOnTrueInList", markingOnTrueInListHandler);
parcelRoutes.post("/markAllParcelOnFalseInList", markingOnFalseInListHandler);
parcelRoutes.post("/markParcelVERIFICATION", markParcelInVerificationHandler);
parcelRoutes.post(
  "/removingParcelsVERIFICATION",
  removeParcelsInVerificationHandler
);

//Deleting all dates
parcelRoutes.post("/deleteAllDates", clearDatesHandler);

export default parcelRoutes;
