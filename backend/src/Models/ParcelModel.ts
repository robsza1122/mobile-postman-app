import mongoose from "mongoose"
import { threeMonthsFromNow } from "../utils/Data"

export interface ParcelDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId,
  userAgent?: string,
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
  cashOnDelivery: boolean,
  amount: number,
  clientEmail: string,
  numberOfParcel: string,
  deliveryCode: string,
  phone: string,
  isMarked: boolean,
  amountOfTrials: number,
  isDeliveryCode: boolean,
  status: {
    name: string,
    createdAt: String,
    subject: string;
    details: string;
    reasonOfAdvice: string,
    officeOfAdvice: string,
    placeOfNotification: string,
  deliveryInput: string;
  isSignature: boolean,
  signature: string,
  noAddressee: boolean,
  }[],
  isDownloaded: boolean;
  forUser: string;
  noAddressee: boolean;
  isBooked: boolean;
  numberOfBook: string;
  createdAt: Date,
  expiresAt: Date, 
};

const parcelSchima = new mongoose.Schema<ParcelDocument>({
    userId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        index: true,
    },
    userAgent: {type: String},
    senderName: {
        type: String,
        required: true,
    },
    senderSurname: {
        type: String,
        required: true,
    },
    senderPostCode: {
        type: String,
        required: true,
    },
    senderCity: {
        type: String,
        required: true,
    },
    senderAdress: {
        type: String,
        required: true,
    },
    senderCountry: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    postCode: {
        type: String,
        required: true,
    },
    cashOnDelivery: {
        type: Boolean,
        required: true,
        default: false,
    },
    amount: {
        type: Number,
    },
    numberOfParcel: {
        type: String,
    },
    deliveryCode: {
        type: String,
    },
    clientEmail: {
        type: String,
    },
    phone: {
        type: String,
    },
    isMarked: {
        type: Boolean,
        default: false,
    },
    amountOfTrials: {
        type: Number,
    },
    isDeliveryCode: {
        type: Boolean,
    },
    status: {
        type: [
            {
          name: String,
          createdAt: String,
          details: String,
          subject: String,
          signature: {
            type: String || null,
            default: null,
          },
          reasonOfAdvice: String,
          officeOfAdvice: String,
          placeOfNotification: String,
          isSignature: Boolean,
          deliveryInput: String,
          noAddressee: Boolean,
          
            }
        ],
    },
    isDownloaded: {
        type: Boolean,
    },
    forUser: {
        type: String,
    },
    isBooked: {
        type: Boolean,
    },
    numberOfBook: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    expiresAt: {
        type: Date,
        required: true,
        default: threeMonthsFromNow(),
    },
});

export const parcelModel = mongoose.model(
        "Order Parcel",
        parcelSchima,
        "parcels",
    )
