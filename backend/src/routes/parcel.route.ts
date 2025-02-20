import { Router } from "express";
import { getCheckStatusHandler, getParcelsHandler, orderedParcelHandler, registerHandler } from "../controllers/parcel.controller";

const postRoutes = Router();

postRoutes.post("/orderParcel", orderedParcelHandler);
postRoutes.get("/getParcels", getParcelsHandler);
postRoutes.get("/getCheckStatus/:number", getCheckStatusHandler);
postRoutes.post("/register", registerHandler);

export default postRoutes;