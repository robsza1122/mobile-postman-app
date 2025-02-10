import { CREATED } from "../constants/http";
import { createOrder } from "../services/auth.service";
import catchErrors from "../utils/catchErrors"
import { parcelSchima } from "./parcel.schimas"



export const orderedParcelHandler = catchErrors(async (req, res) => {
    const request = parcelSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { parcel } = await createOrder(request);
    res.status(CREATED).json(parcel); 
})