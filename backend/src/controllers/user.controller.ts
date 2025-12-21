import { NOT_FOUND, OK } from "../constants/http";
import UserModel from "../Models/UserModel";
import { saveParcelsInUserMemory } from "../services/auth.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchErrors";
import { saveParcelToMemorySchima } from "./saveParcelsInMemorySchima";

export const getUserHandler = catchErrors(async (req, res) => {
    const user = await UserModel.findById(req.userId);
    appAssert(user, NOT_FOUND, "User not found");

    return res.status(OK).json(user);  
});

export const saveParcelsToUserHandler = catchErrors(async (req, res) => {
      const request = saveParcelToMemorySchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
      });
      const { saveParcels } = await saveParcelsInUserMemory(request);

    return res.status(OK).json(saveParcels);
})
