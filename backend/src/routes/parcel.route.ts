import { Router } from "express";
import { getCheckStatusHandler, getParcelsHandler, orderedParcelHandler } from "../controllers/parcel.controller";

const postRoutes = Router();

postRoutes.post("/orderParcel", orderedParcelHandler);
postRoutes.get("/getParcels", getParcelsHandler);
postRoutes.get("/getCheckStatus/:number", getCheckStatusHandler);

export default postRoutes;