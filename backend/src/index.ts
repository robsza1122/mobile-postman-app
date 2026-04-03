import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import { OK } from "./constants/http";
import postManDataBase from "./config/MobilePostmanDB";
import parcelRoutes from "./routes/parcel.route";
import errorHandler from "./middleware/ErrorHandler";
import userRoutes from "./routes/user.route";
import authenticate from "./middleware/authenticate";
import sessionRoutes from "./routes/session.route";
import authRoutes from "./routes/auth.route";
import multiStatusRoutes from "./routes/multiStatus.route";
import statusRoutes from "./routes/status.route";
import path from "path";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(authRoutes);
app.use(multiStatusRoutes);
app.use(parcelRoutes);
app.use(statusRoutes);
//protected-routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);
app.use(errorHandler);
app.get("/firstParcel", (_, res) => {
  return res.status(OK).json({
    name: "first parcel",
  });
});
app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT} in ${NODE_ENV}`);
  await postManDataBase();
});
const frontendPath = path.join(__dirname, '../frontend/dist'); 
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});
