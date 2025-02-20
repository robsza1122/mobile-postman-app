import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./Data";
export const REFRESH_PATH = '/refresh';
const secure = NODE_ENV !== "mobile_postman";

type Params = {
    res: Response;
    accessToken: string;
    refreshToken: string;
};

const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure,
}

export const getAccessTokenOptions = (): CookieOptions => ({
    ...defaults,
    expires: fifteenMinutesFromNow(),
});


export const getRefreshTokenOptions = (): CookieOptions => ({
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: REFRESH_PATH,
})

export const setUserCookies = ({res, accessToken, refreshToken}: Params) => 
    res
.cookie("accessToken", accessToken, getAccessTokenOptions())
.cookie("refreshToken", refreshToken, getRefreshTokenOptions());
  
export const clearUserCookies = (res: Response) => 
    res
.clearCookie("accessToken")
.clearCookie("refreshToken", {path: REFRESH_PATH});
