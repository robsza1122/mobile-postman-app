import { Router } from "express";
import {
  multiAdvicingHandler,
  multiDeliveryHandler,
  multiResultsHandler,
} from "../controllers/parcel.controller";
const multiStatusRoutes = Router();

multiStatusRoutes.post("/multiDelivery", multiDeliveryHandler);
multiStatusRoutes.post("/multiAdvicing", multiAdvicingHandler);
multiStatusRoutes.post("/multiResults", multiResultsHandler);

export default multiStatusRoutes;
