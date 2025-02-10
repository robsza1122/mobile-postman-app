import mongoose from "mongoose"
import { threeMonthsFromNow } from "../utils/Data"

export interface ParcelDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId,
  userAgent?: string,
  sender: string,
  adressee: string,
  city: string,
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
    sender: {
        type: String,
        required: true,
    },
    adressee: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
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
        "First parcel",
        parcelSchima,
        "first_parcel",
    )
