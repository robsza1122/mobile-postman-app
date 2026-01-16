import { Router } from "express";
import {
  addInDeliveryStatusHandler,
  advicedStatusHandler,
  deliveredStatusHandler,
  failedDeliveryCodeHandler,
  otherResultHandler,
} from "../controllers/parcel.controller";
const statusRoutes = Router();


statusRoutes.post("/addDeliveredStatus", deliveredStatusHandler);
statusRoutes.post("/addAdvicedStatus", advicedStatusHandler);
statusRoutes.post("/addOtherStatus", otherResultHandler);
statusRoutes.post("/handleFailedDeliveryCode", failedDeliveryCodeHandler);
statusRoutes.post("/addInDeliveryStatus", addInDeliveryStatusHandler);

export default statusRoutes;
