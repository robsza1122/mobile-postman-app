"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearUserCookies = exports.setUserCookies = exports.getRefreshTokenOptions = exports.getAccessTokenOptions = exports.REFRESH_PATH = void 0;
const env_1 = require("../constants/env");
const Data_1 = require("./Data");
exports.REFRESH_PATH = '/refresh';
const secure = env_1.NODE_ENV !== "mobile_postman";
const defaults = {
    sameSite: "strict",
    httpOnly: true,
    secure,
};
const getAccessTokenOptions = () => ({
    ...defaults,
    expires: (0, Data_1.fifteenMinutesFromNow)(),
});
exports.getAccessTokenOptions = getAccessTokenOptions;
const getRefreshTokenOptions = () => ({
    ...defaults,
    expires: (0, Data_1.thirtyDaysFromNow)(),
    path: exports.REFRESH_PATH,
});
exports.getRefreshTokenOptions = getRefreshTokenOptions;
const setUserCookies = ({ res, accessToken, refreshToken }) => res
    .cookie("accessToken", accessToken, (0, exports.getAccessTokenOptions)())
    .cookie("refreshToken", refreshToken, (0, exports.getRefreshTokenOptions)());
exports.setUserCookies = setUserCookies;
const clearUserCookies = (res) => res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: exports.REFRESH_PATH });
exports.clearUserCookies = clearUserCookies;
