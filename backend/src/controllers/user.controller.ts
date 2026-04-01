import { NOT_FOUND, OK } from "../constants/http";
import UserModel from "../Models/UserModel";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchErrors";

export const getUserHandler = catchErrors(async (req, res) => {
    const user = await UserModel.findById((req as any).userId);
    appAssert(user, NOT_FOUND, "User not found");

    return res.status(OK).json(user);  
});
