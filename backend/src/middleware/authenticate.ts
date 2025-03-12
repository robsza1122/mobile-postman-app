import { RequestHandler } from "express";
import appAssert from "../utils/AppAssert";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/AppErrorCode";
import { verifyToken } from "../utils/jwt";

const authenticate: RequestHandler = (req, res, next) => {
    const accessToken = req.cookies.accessToken as string | undefined;
    appAssert(
        accessToken,
        UNAUTHORIZED,
        "Not authorized",
        AppErrorCode.InvalidAccessToken,
    );

    const {error, payload} = verifyToken(accessToken);
    appAssert(
        payload,
        UNAUTHORIZED,
        error === "jwt expired" ? "Token expired" : "Invalid access token",
        AppErrorCode.InvalidAccessToken
    );
    //@ts-expect-error
    req.userId = payload.userId;
    //@ts-expect-error
    req.sessionId = payload.sessionId;
    next();
}

export default authenticate;