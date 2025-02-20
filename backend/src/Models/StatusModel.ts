import mongoose from "mongoose"
import { StatusType } from "../constants/StatusType";
import { ParcelDocument } from "./ParcelModel";

export interface StatusDocument extends mongoose.Document {
    numberOfParcel: string;
    status: StatusType;
    parcel: ParcelDocument; 
}

const StatusSchema = new mongoose.Schema<StatusDocument>({
    numberOfParcel: {
        type: String,
    },
    status: {
        type: String,
    },
    parcel: {
        type: Object,
    },
}) 

export const StatusModel = mongoose.model(
    "Status",
    StatusSchema,
    "status",
)
