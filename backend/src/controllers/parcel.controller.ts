import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import { parcelModel } from "../Models/ParcelModel";
import SessionModel from "../Models/SessionModel";
import {
  createNewUser,
  createOrder,
  loginUser,
  refreshUserAccessToken,
} from "../services/auth.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchErrors";
import {
  clearUserCookies,
  getAccessTokenOptions,
  getRefreshTokenOptions,
  setUserCookies,
} from "../utils/cookies";
import { verifyToken } from "../utils/jwt";
import { parcelSchima } from "./parcel.schimas";
import { loginShema, registerSchima } from "./user.schima";

export const orderedParcelHandler = catchErrors(async (req, res) => {
  const request = parcelSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { parcel } = await createOrder(request);
  res.status(CREATED).json(parcel);
});

export const getParcelsHandler = catchErrors(async (req, res) => {
  const parcels = await parcelModel.find(
    {
      userId: req.userId,
    },
    {
      senderName: 1,
      senderSurname: 1,
      senderPostCode: 1,
      senderCity: 1,
      senderAdress: 1,
      senderCountry: 1,
      name: 1,
      surname: 1,
      city: 1,
      country: 1,
      adress: 1,
      postCode: 1,
      amount: 1,
      cashOnDelivery: 1,
      clientEmail: 1,
      phone: 1,
      numberOfParcel: 1,
      status: [
        {
          name: 1,
          createdAt: 1,
        }
      ]
    },
    {
      sort: { createdAt: -1 },
    }
  );

  return res
    .status(OK)
    .json(parcels.map((parcel) => ({ ...parcel.toObject() })));
});

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
