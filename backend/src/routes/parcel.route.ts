import { Router } from "express";
import {
  checkStatusHandler,
  differentStatusHandler,
  getParcelsHandler,
  inDeliveryStatusHandler,
  loginHandler,
  logoutHandler,
  orderedParcelHandler,
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
postRoutes.post("/addDifferentStatus", differentStatusHandler);

export default postRoutes;
