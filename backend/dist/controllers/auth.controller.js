"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshHandler = exports.logoutHandler = exports.loginHandler = exports.registerHandler = void 0;
const http_1 = require("../constants/http");
const SessionModel_1 = __importDefault(require("../Models/SessionModel"));
const user_schima_1 = require("../schimas/user.schima");
const auth_service_1 = require("../services/auth.service");
const parcel_service_1 = require("../services/parcel.service");
const AppAssert_1 = __importDefault(require("../utils/AppAssert"));
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const cookies_1 = require("../utils/cookies");
const jwt_1 = require("../utils/jwt");
exports.registerHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = user_schima_1.registerSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { newUser, accessToken, refreshToken } = await (0, parcel_service_1.createNewUser)(request);
    return (0, cookies_1.setUserCookies)({ res, accessToken, refreshToken })
        .status(http_1.CREATED)
        .json(newUser);
});
exports.loginHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = user_schima_1.loginShema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { accessToken, refreshToken } = await (0, parcel_service_1.loginUser)(request);
    return (0, cookies_1.setUserCookies)({ res, accessToken, refreshToken })
        .status(http_1.OK)
        .json({ message: "Login successful" });
});
exports.logoutHandler = (0, catchErrors_1.default)(async (req, res) => {
    const accessToken = req.cookies.accessToken || undefined;
    const { payload } = (0, jwt_1.verifyToken)(accessToken || "");
    if (payload) {
        await SessionModel_1.default.findByIdAndDelete(payload.sessionId);
    }
    return (0, cookies_1.clearUserCookies)(res)
        .status(http_1.OK)
        .json({ message: "Logout successful" });
});
exports.refreshHandler = (0, catchErrors_1.default)(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    (0, AppAssert_1.default)(refreshToken, http_1.UNAUTHORIZED, "Missing refresh token");
    const { accessToken, newRefreshToken } = await (0, auth_service_1.refreshUserAccessToken)(refreshToken);
    if (newRefreshToken) {
        res
            .status(http_1.OK)
            .cookie("refreshToken", newRefreshToken, (0, cookies_1.getRefreshTokenOptions)());
    }
    return res
        .status(http_1.OK)
        .cookie("accessToken", accessToken, (0, cookies_1.getAccessTokenOptions)())
        .json({ message: "Access token refreshed" });
});
