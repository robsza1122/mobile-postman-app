import { boolean, z } from "zod";
import { APP_ORIGIN } from "../constants/env";
import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import { parcelModel } from "../Models/ParcelModel";
import SessionModel from "../Models/SessionModel";
import UserModel from "../Models/UserModel";
import {
  addInDeliveryStatus,
  advicedStatus,
  assignParcels,
  createNewUser,
  createOrder,
  date,
  deleteBook,
  deliveredStatus,
  loginUser,
  markParcel,
  otherStatus,
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
import { getDeliveryEmailTemplate } from "../utils/emailTemplate";
import { getAdvicingEmail } from "../utils/getAdvicingEmail";
import { getDeliveredEmailTemplate } from "../utils/getDeliveredEmailTemplate";
import { getInDeliveryStatusEmail } from "../utils/InDeliveryEmail";
import { verifyToken } from "../utils/jwt";
import { otherStatusEmail } from "../utils/otherStatusEmail";
import { sendEmail } from "../utils/sendEmail";
import { parcelSchima } from "./parcel.schimas";
import { statusSchima } from "./status.schima";
import { loginShema, registerSchima } from "./user.schima";
import { usersParcelSchima } from "./usersparcel.schima";
import { assignParcelSchima } from "./assignparcels.schima";
import { markParcelSchima } from "./markparcel.schima";

export const orderedParcelHandler = catchErrors(async (req, res) => {
  const request = parcelSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { parcel } = await createOrder(request);
  const url = `${APP_ORIGIN}/getCheckStatus/${parcel._id}`;

  await sendEmail({
    ...getDeliveryEmailTemplate(parcel, url),
    to: parcel.clientEmail,
  });
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
      isMarked: 1,
      deliveryCode: 1,
      amountOfTrials: 1,
      isDeliveryCode: 1,
      status: 1,
      isBooked: 1,
      numberOfBook: 1,
      forUser: 1,
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

export const checkStatusHandler = catchErrors(async (req, res) => {
  const checkedParcel = await parcelModel.findById(req.params.id);

  appAssert(checkedParcel, NOT_FOUND, "Parcel not found");

  return res.status(OK).json(checkedParcel);
});

export const addInDeliveryStatusHandler = catchErrors(async (req, res) => {
  const request = usersParcelSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { assignParcelsToUser } = await addInDeliveryStatus(request);

  return res.status(OK).json(assignParcelsToUser);
});

export const deliveredStatusHandler = catchErrors(async (req, res) => {
  const request = statusSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { updatedUser } = await deliveredStatus(request);

  return res.status(OK).json(updatedUser);
});

export const advicedStatusHandler = catchErrors(async (req, res) => {
  const request = statusSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { updatedUser } = await advicedStatus(request);

  return res.status(OK).json(updatedUser);
});

export const otherResultHandler = catchErrors(async (req, res) => {
  const request = statusSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { updatedUser } = await otherStatus(request);

  return res.status(OK).json(updatedUser);
});

export const inDeliveryEmailHandler = catchErrors(async (req, res) => {
  const sendEmailById = await parcelModel.findById(req.params.id);
  appAssert(sendEmailById, NOT_FOUND, "Email not found");
  const url = `${APP_ORIGIN}/checkStatus/${req.params.id}`;

  await sendEmail({
    ...getInDeliveryStatusEmail(sendEmailById, url),
    to: sendEmailById.clientEmail,
  });
  appAssert(sendEmailById, NOT_FOUND, "Parcel not found");

  return res.status(OK).json({
    message: "Email was successfully sent",
  });
});

export const showUsersHandler = catchErrors(async (req, res) => {
  const users = await UserModel.find(
    {
      userId: req.userId,
    },
    {
      username: 1,
      password: 1,
      EMINumber: 1,
      parcels: 1,
    },
    {
      sort: { createdAt: -1 },
    }
  );

  return res.status(OK).json(users.map((user) => ({ ...user.toObject() })));
});

export const assignParcelsHandler = catchErrors(async (req, res) => {
  const request = assignParcelSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { assignedParcels } = await assignParcels(request);

  return res.status(OK).json(assignedParcels);
});

export const markParcelHandler = catchErrors(async (req, res) => {
  const request = markParcelSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { markedParcel } = await markParcel(request);

  return res.status(OK).json(markedParcel);
});

export const markingOnTrueHandler = catchErrors(async (req, res) => {
  await parcelModel.updateMany(
    { isBooked: false },
    {
      $set: { isMarked: true },
    }
  );
  const updateParcels = await parcelModel.find({});

  res.status(OK).json(updateParcels);
});

export const markingOnFalseHandler = catchErrors(async (req, res) => {
  await parcelModel.updateMany(
    { isBooked: false },
    {
      $set: { isMarked: false },
    }
  );

  const updateParcels = await parcelModel.find({});

  res.status(OK).json(updateParcels);
});

export const deleteBookHandler = catchErrors(async (req, res) => {
  const request = assignParcelSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { updatedParcels } = await deleteBook(request);

  return res.status(OK).json(updatedParcels);
});

export const clearDatesHandler = catchErrors(async (req, res) => {
  const orderStatus = {
    name: "ORDERED",
    createdAt: date,
    subject: "",
    details: "",
    signature: null,
    isDeliveryCode: false,
    isSignature: false,
    noAddressee: false,
    deliveryInput: "",
    reasonOfAdvice: "",
    officeOfAdvice: "",
    placeOfNotification: "",
  };
  await parcelModel.updateMany(
    {},
    {
      $set: {
        status: orderStatus,
        isBooked: false,
        isDownloaded: false,
        forUser: "",
        numberOfBook: "",
        isMarked: false,
      },
    }
  );

  await UserModel.updateMany(
    {},
    {
      $set: { parcels: [] },
    }
  );

  return res.status(OK).json({
    message: "Book is successfully cleared",
  });
});
