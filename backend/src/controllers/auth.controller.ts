import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import SessionModel from "../Models/SessionModel";
import { loginShema, registerSchima } from "../schimas/user.schima";
import { refreshUserAccessToken } from "../services/auth.service";
import { createNewUser, loginUser } from "../services/parcel.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchErrors";
import { clearUserCookies, getAccessTokenOptions, getRefreshTokenOptions, setUserCookies } from "../utils/cookies";
import { verifyToken } from "../utils/jwt";

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { newUser, accessToken, refreshToken } = await createNewUser(request);

  return setUserCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(newUser);
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginShema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken } = await loginUser(request);

  return setUserCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Login successful" });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = (req.cookies.accessToken as string) || undefined;
  const { payload } = verifyToken(accessToken || "");

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  return clearUserCookies(res)
    .status(OK)
    .json({ message: "Logout successful" });
});

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string;

  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(
    refreshToken
  );

  if (newRefreshToken) {
    res
      .status(OK)
      .cookie("refreshToken", newRefreshToken, getRefreshTokenOptions());
  }

  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenOptions())
    .json({ message: "Access token refreshed" });
});


