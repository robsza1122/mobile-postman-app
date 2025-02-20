import { APP_ORIGIN } from "../constants/env";
import { CONFLICT } from "../constants/http";
import { StatusType } from "../constants/StatusType";
import { parcelModel } from "../Models/ParcelModel"
import { StatusModel } from "../Models/StatusModel";
import { UserModel } from "../Models/UserModel";
import appAssert from "../utils/AppAssert";
import { getDeliveryEmailTemplate } from "../utils/emailTemplate";
import { sendEmail } from "../utils/sendEmail";

export type CreateParcelOrder = {
    senderName: string,
  senderSurname: string,
  senderPostCode: string,
  senderCity: string,
  senderAdress: string,
  senderCountry: string,
  name: string,
  surname: string,
  city: string,
  country: string,
  adress: string;
  postCode: string,
  amount: number,
  cashOnDelivery: boolean,
  clientEmail: string,
  phone?: string,
  numberOfParcel?: string,
};

type CreateNewUserType = {
  username: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
}

export const createNumber = (Math.random() * 1000000000000).toFixed(0);

export const createNewUser = async (data: CreateNewUserType) => {
  const duplicatedUser = await UserModel.exists({
    username: data.username,
  });

  appAssert(!duplicatedUser, CONFLICT, "User already exists.");
  
  const newUser = await UserModel.create({
    username: data.username,
    password: data.password,
    confirmPassword: data.confirmPassword,
  });


  if (data.password !== data.confirmPassword) {
    appAssert(newUser, CONFLICT, 'Passwords should be this same.');
  } 

  return {
    newUser
  }
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
      status: parcel.cashOnDelivery ? 
      StatusType.SENTTOPACK : 
      StatusType.UNPAID,
      parcel: parcel,
    })

    if (data.cashOnDelivery && data.amount === 0) {
        appAssert(data.cashOnDelivery, CONFLICT, "Amount of money required")
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
    }
};

export const findCheckStatus = async (number: string) => {
  const status = await StatusModel.findOne({
    numberOfParcel: number,
  });

  return {
    status,
  }
};

