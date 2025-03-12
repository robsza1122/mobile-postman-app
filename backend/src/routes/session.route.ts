import { Router } from "express";
import { getSessionHandler } from "../controllers/session.controller";

const sessionRoutes = Router();

sessionRoutes.get("/", getSessionHandler);

export default sessionRoutes;