import { APP_ORIGIN } from "../constants/env";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import { StatusType } from "../constants/StatusType";
import { parcelModel } from "../Models/ParcelModel";
import SessionModel from "../Models/SessionModel";
import { StatusModel } from "../Models/StatusModel";
import UserModel from "../Models/UserModel";
import appAssert from "../utils/AppAssert";
import { getDeliveryEmailTemplate } from "../utils/emailTemplate";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../utils/jwt";
import { sendEmail } from "../utils/sendEmail";
import { ONE_DAY_MS, thirtyDaysFromNow } from "../utils/Data";

export type CreateParcelOrder = {
  senderName: string;
  senderSurname: string;
  senderPostCode: string;
  senderCity: string;
  senderAdress: string;
  senderCountry: string;
  name: string;
  surname: string;
  city: string;
  country: string;
  adress: string;
  postCode: string;
  amount: number;
  cashOnDelivery: boolean;
  clientEmail: string;
  phone?: string;
  numberOfParcel?: string;
};

type CreateNewUserType = {
  username: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
};

export const createNumber = (Math.random() * 1000000000000).toFixed(0);

export const createNewUser = async (data: CreateNewUserType) => {
  const duplicatedUser = await UserModel.exists({
    username: data.username,
  });

  appAssert(!duplicatedUser, CONFLICT, "User already exists.");

  const newUser = await UserModel.create({
    username: data.username,
    password: data.password,
  });

  const newSession = await SessionModel.create({
    userId: newUser._id,
    userAgent: data.userAgent,
  });

  const refreshToken = signToken(
    {
      sessionId: newSession._id,
    },
    refreshTokenSignOptions
  );
  const accessToken = signToken({
    userId: newUser._id,
    sessionId: newSession._id,
  });

  return {
    newUser,
    refreshToken,
    accessToken,
  }; 
};

export const createOrder = async (data: CreateParcelOrder) => {
  const parcel = await parcelModel.create({
    senderName: data.senderName,
    senderSurname: data.senderSurname,
    senderPostCode: data.senderPostCode,
    senderCity: data.senderCity,
    senderAdress: data.senderAdress,
    senderCountry: data.senderCountry,
    name: data.name,
    surname: data.surname,
    city: data.city,
    country: data.country,
    adress: data.adress,
    postCode: data.postCode,
    amount: data.cashOnDelivery ? data.amount : 0,
    cashOnDelivery: data.cashOnDelivery,
    clientEmail: data.clientEmail,
    phone: data.phone,
    numberOfParcel: `PX${createNumber}`,
  });
  const status = await StatusModel.create({
    numberOfParcel: parcel.numberOfParcel,
    status: parcel.cashOnDelivery ? StatusType.SENTTOPACK : StatusType.UNPAID,
    parcel: parcel,
  });

  if (data.cashOnDelivery && data.amount === 0) {
    appAssert(data.cashOnDelivery, CONFLICT, "Amount of money required");
    throw new Error("Amount of money is required");
  }

  const url = `${APP_ORIGIN}/getCheckStatus/${parcel.numberOfParcel}`;

  await sendEmail({
    ...getDeliveryEmailTemplate(parcel, url),
    to: parcel.clientEmail,
  });

  return {
    parcel,
    parcelStatus: status,
  };
};

export const findCheckStatus = async (number: string) => {
  const status = await StatusModel.findOne({
    numberOfParcel: number,
  });

  return {
    status,
  };
};

type LoginParams = {
  username: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async ({
  username,
  password,
  userAgent,
}: LoginParams) => {
  const loggedUser = await UserModel.findOne({ username });
  appAssert(loggedUser, UNAUTHORIZED, "Invalid email or password.");

  const logValidation = await loggedUser.comparePassword(password);
  appAssert(logValidation, UNAUTHORIZED, "Invalid email or password.");

  const session = await SessionModel.create({
    userId: loggedUser._id,
    userAgent,
  });

  const sessionInfo: RefreshTokenPayload = {
    sessionId: session._id,
  };

  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
  const accessToken = signToken({
    ...sessionInfo,
    userId: loggedUser._id,
  });

  return {
    loggedUser,
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const newSession = await SessionModel.findById(payload.sessionId);
  const now = Date.now();

  appAssert(
    newSession && newSession.expiresAt.getTime() > now,
    UNAUTHORIZED,
    "Session expired"
  );

  const sessionNeedsRefresh =
    newSession.expiresAt.getTime() - now <= ONE_DAY_MS;
  if (sessionNeedsRefresh) {
    newSession.expiresAt = thirtyDaysFromNow();
    await newSession.save();
  }

  const newRefreshToken = sessionNeedsRefresh
    ? signToken(
        {
          sessionId: newSession._id,
        }, 
        refreshTokenSignOptions
      )
    : undefined;

  const accessToken = signToken({
    userId: newSession.userId,
    sessionId: newSession._id,
  });

  return {
    accessToken,
    newRefreshToken,
  };
};
