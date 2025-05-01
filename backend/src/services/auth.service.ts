import { APP_ORIGIN } from "../constants/env";
import { CONFLICT, NOT_FOUND, UNAUTHORIZED } from "../constants/http";
import { parcelModel } from "../Models/ParcelModel";
import SessionModel from "../Models/SessionModel";
import UserModel from "../Models/UserModel";
import appAssert from "../utils/AppAssert";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../utils/jwt";
import { sendEmail } from "../utils/sendEmail";
import { ONE_DAY_MS, thirtyDaysFromNow } from "../utils/Data";
import makeEmiNumber from "../utils/getEMINumber";
import { getDeliveredEmailTemplate } from "../utils/getDeliveredEmailTemplate";
import { off } from "node:process";
import { getAdvicingEmail } from "../utils/getAdvicingEmail";
import { otherStatusEmail } from "../utils/otherStatusEmail";

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
  clientEmail?: string;
  phone?: string;
  numberOfParcel?: string;
  deliveryCode?: string;
  isMarked?: boolean;
  amountOfTrials?: number;
  isDeliveryCode?: boolean;
  status?: {
    name: string;
    createdAt: String;
    subject?: string;
    details?: string;
    isSignature?: boolean;
    signature?: string;
    deliveryInput?: string | null;
    noAddressee?: boolean;
    reasonOfAdvice?: string;
    officeOfAdvice?: string;
    placeOfNotification?: string;
  }[];
  forUser?: string;
  isBooked?: boolean;
  numberOfBook?: string;
  _id?: unknown;
};

const today = new Date();
const currentMonth = today.getMonth() + 1;

export const date = `Date: ${today.getFullYear()}-${
  currentMonth.toString().length === 1 ? "0" : ""
}${currentMonth}-${
  today.getDate().toString().length === 1 ? "0" : ""
}${today.getDate()} Hour: ${
  today.getHours().toString().length === 1 ? "0" : ""
}${today.getHours()}-${
  today.getMinutes().toString().length === 1 ? "0" : ""
}${today.getMinutes()}-${
  today.getSeconds().toString().length === 1 ? "0" : ""
}${today.getSeconds()}`;

type CreateNewUserType = {
  username: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
};

export const createNumber = () =>
  (Math.random() * 10000000000000).toFixed(0).toString().slice(0, 12);
export const createDeliveryCode = () =>
  (Math.random() * 1000000000).toFixed(0).toString().slice(0, 6);

export const createNewUser = async (data: CreateNewUserType) => {
  const duplicatedUser = await UserModel.exists({
    username: data.username,
  });

  appAssert(!duplicatedUser, CONFLICT, "User already exists.");

  const { result } = makeEmiNumber(3);

  const newUser = await UserModel.create({
    username: data.username,
    password: data.password,
    downloadedParcels: [],
    EMINumber: result,
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
    amountOfTrials: 0,
    isDeliveryCode: false,
    isMarked: false,
    deliveryCode: `${createDeliveryCode()}`,
    status: {
      name: "ORDERED",
      subject: "",
      details: "",
      createdAt: date,
      isSignature: false,
      signature: null,
      deliveryInput: "",
      noAddressee: false,
      reasonOfAdvice: "",
      officeOfAdvice: "",
      placeOfNotification: "",
    },
    forUser: "",
    isBooked: false,
    numberOfBook: "",
    numberOfParcel: `PX${createNumber()}`,
  });

  if (data.cashOnDelivery && data.amount === 0) {
    appAssert(data.cashOnDelivery, CONFLICT, "Amount of money required");
    throw new Error("Amount of money is required");
  }

  return {
    parcel,
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

type InDeliveryType = {
  numberOfBook: string;
  username: string;
};

type AssignType = {
  numberOfBook: string;
  username: string;
};

export const assignParcels = async ({ numberOfBook, username }: AssignType) => {
  await parcelModel.updateMany(
    { isMarked: true, forUser: "" },
    {
      $set: {
        isBooked: true,
        isMarked: false,
        numberOfBook,
        forUser: username,
      },
    }
  );

  const assignedParcels = await parcelModel.find({});

  return {
    assignedParcels,
  };
};

export const addInDeliveryStatus = async ({
  numberOfBook,
  username,
}: InDeliveryType) => {
  const addStatus = {
    name: "IN DELIVERY",
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
    {numberOfBook },
    {
      $push: { status: addStatus },
      $set: { isDownloaded: true },
    }
  );

  const updatedParcels = await parcelModel.find({ forUser: username, isDownloaded: true });

  const assignParcelsToUser = await UserModel.findOneAndUpdate(
    { username },
    {
      $set: { parcels: updatedParcels },
    }
  );

  return {
    assignParcelsToUser,
  };
}; 

type MarkParcelType = {
  id: string;
  markParcel: boolean;
};

export const markParcel = async ({ id, markParcel }: MarkParcelType) => {
  const markedParcel = await parcelModel.findByIdAndUpdate(id, {
    isMarked: markParcel,
  });

  return {
    markedParcel,
  };
};

type DifferentStatusType = {
  nameOfStatus: string;
  id: string;
  subject: string;
  details: string;
  signature?: any;
  isDeliveryCode: boolean;
  isSignature: boolean;
  noAddressee?: boolean;
  deliveryInput: string;
  reasonOfAdvice: string;
  officeOfAdvice: string;
  placeOfNotification: string;
  isBooked?: boolean;
  numberOfBook?: string;
  username?: string;
  isDownloaded?: boolean;
};

export const deliveredStatus = async ({
  nameOfStatus,
  id,
  subject,
  details,
  signature,
  isDeliveryCode,
  noAddressee,
  deliveryInput,
  reasonOfAdvice,
  officeOfAdvice,
  placeOfNotification,
  isBooked,
  numberOfBook,
  username,
  isDownloaded,
}: DifferentStatusType) => {
  const addStatus = {
    name: nameOfStatus,
    createdAt: date,
    subject,
    details,
    signature,
    isDeliveryCode,
    noAddressee,
    deliveryInput,
    reasonOfAdvice,
    officeOfAdvice,
    placeOfNotification,
  }


  const updateParcel = await parcelModel.findOneAndUpdate(
    {_id: id},
    {
      $set: { isBooked, numberOfBook, isMarked: false, forUser: username },
      $push: { status: addStatus },
    }
  );

  const updateParcelsForUser = await parcelModel.find({isDownloaded, forUser: username})

  const updatedUser = await UserModel.findOneAndUpdate(
    { username },
    {
      $set: { parcels: updateParcelsForUser },
    }
  );

  appAssert(updatedUser, NOT_FOUND, "Can not update user")

  const url = `${APP_ORIGIN}/checkStatus/${id}`;

  appAssert(updateParcel, NOT_FOUND, "Wrong id");

  await sendEmail({
    ...getDeliveredEmailTemplate(updateParcel, url),
    to: updateParcel.clientEmail,
  });

  return {
    updatedUser,
  };
};

export const advicedStatus = async ({
  nameOfStatus,
  id,
  subject,
  details,
  signature,
  isDeliveryCode,
  noAddressee,
  deliveryInput,
  reasonOfAdvice,
  officeOfAdvice,
  placeOfNotification,
  isBooked,
  numberOfBook,
  username,
  isDownloaded,
}: DifferentStatusType) => {
  const addStatus = {
    name: nameOfStatus,
    createdAt: date,
    subject,
    details,
    signature,
    isDeliveryCode,
    noAddressee,
    deliveryInput,
    reasonOfAdvice,
    officeOfAdvice,
    placeOfNotification,
  };

  const updateParcel = await parcelModel.findOneAndUpdate(
    {_id: id},
    {
      $set: { isBooked, numberOfBook, isMarked: false },
      $push: { status: addStatus },
    }
  );

  const updateParcelsForUser = await parcelModel.find({isDownloaded, forUser: username})

  const updatedUser = await UserModel.findOneAndUpdate(
    { username },
    {
      $set: { parcels: updateParcelsForUser },
    }
  );

  appAssert(updatedUser, NOT_FOUND, "Can not update user")

  appAssert(updateParcel, NOT_FOUND, "Wrong id");
  const url = `${APP_ORIGIN}/checkStatus/${updateParcel._id}`;

  await sendEmail({
    ...getAdvicingEmail(updateParcel, url),
    to: updateParcel.clientEmail,
  });

  return {
    updatedUser,
  }
};

export const otherStatus = async ({
  nameOfStatus,
  id,
  subject,
  details,
  signature,
  isDeliveryCode,
  noAddressee,
  deliveryInput,
  reasonOfAdvice,
  officeOfAdvice,
  placeOfNotification,
  isBooked,
  numberOfBook,
  username,
  isDownloaded,
}: DifferentStatusType) => {
  const addStatus = {
    name: nameOfStatus,
    createdAt: date,
    subject,
    details,
    signature,
    isDeliveryCode,
    noAddressee,
    deliveryInput,
    reasonOfAdvice,
    officeOfAdvice,
    placeOfNotification,
  };

  const updateParcel = await parcelModel.findOneAndUpdate(
    {_id: id},
    {
      $set: { isBooked, numberOfBook, isMarked: false },
      $push: { status: addStatus },
    }
  );

  const updateParcelsForUser = await parcelModel.find({isDownloaded, forUser: username})

  const updatedUser = await UserModel.findOneAndUpdate(
    { username },
    {
      $set: { parcels: updateParcelsForUser },
    }
  );

  appAssert(updatedUser, NOT_FOUND, "Can not update user")

  appAssert(updateParcel, NOT_FOUND, "Wrong id");
  const url = `${APP_ORIGIN}/checkStatus/${updateParcel._id}`;

  await sendEmail({
    ...otherStatusEmail(updateParcel, url),
    to: updateParcel.clientEmail,
  });

  return {
    updatedUser,
  }
};
