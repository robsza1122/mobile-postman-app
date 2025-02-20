import mongoose from "mongoose"
import { threeMonthsFromNow } from "../utils/Data";

export interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
  confirmPassword: string;
  createdAt: Date;
  expiresAt: Date;
  userAgent?: string;
}

const userSchima = new mongoose.Schema<UserDocument>({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expiresAt: {
        type: Date,
        default: threeMonthsFromNow()
    },
    userAgent: {
        type: String,
    }
});

export const UserModel = mongoose.model(
    "User",
    userSchima,
    "users",
)
