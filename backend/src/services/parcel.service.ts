import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import { parcelModel } from "../Models/ParcelModel";
import SessionModel from "../Models/SessionModel";
import UserModel from "../Models/UserModel";
import appAssert from "../utils/AppAssert";
import makeEmiNumber from "../utils/getEMINumber";
import { RefreshTokenPayload, refreshTokenSignOptions, signToken } from "../utils/jwt";

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
  isMarkedVERIFICATION?: boolean;
  amountOfTrials?: number;
  isDeliveryCode?: boolean;
  placeOfLeavingParcel?: string;
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
  isDownloaded?: boolean;
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
    isDownloaded: false,
    isDeliveryCode: false,
    isMarked: false,
    isMarkedVERIFICATION: false,
    deliveryCode: `${createDeliveryCode()}`,
    placeOfLeavingParcel: "",
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
