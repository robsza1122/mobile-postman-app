import { Router } from "express";
import { orderedParcelHandler } from "../controllers/parcel.controller";

const postRoutes = Router();

postRoutes.post("/orderParcel", orderedParcelHandler);

export default postRoutes;