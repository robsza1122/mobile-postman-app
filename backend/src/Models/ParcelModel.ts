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
    clientEmail: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: threeMonthsFromNow,
    },
});

export const parcelModel = mongoose.model(
        "Order Parcel",
        parcelSchima,
        "parcels",
    )
