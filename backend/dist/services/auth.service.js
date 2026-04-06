"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshUserAccessToken = void 0;
const http_1 = require("../constants/http");
const SessionModel_1 = __importDefault(require("../Models/SessionModel"));
const AppAssert_1 = __importDefault(require("../utils/AppAssert"));
const jwt_1 = require("../utils/jwt");
const Data_1 = require("../utils/Data");
const refreshUserAccessToken = async (refreshToken) => {
    const { payload } = (0, jwt_1.verifyToken)(refreshToken, {
        secret: jwt_1.refreshTokenSignOptions.secret,
    });
    (0, AppAssert_1.default)(payload, http_1.UNAUTHORIZED, "Invalid refresh token");
    const newSession = await SessionModel_1.default.findById(payload.sessionId);
    const now = Date.now();
    (0, AppAssert_1.default)(newSession && newSession.expiresAt.getTime() > now, http_1.UNAUTHORIZED, "Session expired");
    const sessionNeedsRefresh = newSession.expiresAt.getTime() - now <= Data_1.ONE_DAY_MS;
    if (sessionNeedsRefresh) {
        newSession.expiresAt = (0, Data_1.thirtyDaysFromNow)();
        await newSession.save();
    }
    const newRefreshToken = sessionNeedsRefresh
        ? (0, jwt_1.signToken)({
            sessionId: newSession._id,
        }, jwt_1.refreshTokenSignOptions)
        : undefined;
    const accessToken = (0, jwt_1.signToken)({
        userId: newSession.userId,
        sessionId: newSession._id,
    });
    return {
        accessToken,
        newRefreshToken,
    };
};
exports.refreshUserAccessToken = refreshUserAccessToken;
