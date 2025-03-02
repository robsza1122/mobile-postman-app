import mongoose, { ObjectId } from "mongoose";
import { compareValue, hashValue } from "../utils/bscrypt";

export interface UserDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  __v: number;
  omitPassword(): Pick <UserDocument,
    "username" | "createdAt" | "updatedAt" | "_id" | "__v">;
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
},
{
    timestamps: true,
});
userSchima.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await hashValue(this.password);
    return next();
});

userSchima.methods.comparePassword = async function (val: string) {
    return compareValue(val, this.password);
};

userSchima.methods.omitPassword = async function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

const UserModel = mongoose.model<UserDocument>(
    "User",
    userSchima,
)

export default UserModel;
