import { Router } from "express";
import {
  advicedStatusHandler,
  checkStatusHandler,
  deliveredStatusHandler,
  getParcelsHandler,
  inDeliveryStatusHandler,
  loginHandler,
  logoutHandler,
  orderedParcelHandler,
  otherResultHandler,
  refreshHandler,
  registerHandler,
} from "../controllers/parcel.controller";

const postRoutes = Router();

postRoutes.post("/orderParcel", orderedParcelHandler);
postRoutes.get("/getParcels", getParcelsHandler);
postRoutes.post("/register", registerHandler);
postRoutes.post("/login", loginHandler);
postRoutes.get("/logout", logoutHandler);
postRoutes.get("/refresh", refreshHandler);
postRoutes.post("/checkStatus/:id", checkStatusHandler);
postRoutes.post("/addInDeliveryStatus", inDeliveryStatusHandler);
postRoutes.post("/addDeliveredStatus", deliveredStatusHandler);
postRoutes.post("/addAdvicedStatus", advicedStatusHandler);
postRoutes.post("/addOtherResult", otherResultHandler); 

export default postRoutes;
