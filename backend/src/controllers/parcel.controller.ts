import { CREATED, OK } from "../constants/http";
import { parcelModel } from "../Models/ParcelModel";
import { createNewUser, createOrder, findCheckStatus } from "../services/auth.service";
import catchErrors from "../utils/catchErrors"
import { parcelSchima } from "./parcel.schimas"
import { UserSchima } from "./user.schima";

export const orderedParcelHandler = catchErrors(async (req, res) => {
    const request = parcelSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { parcel } = await createOrder(request);
    res.status(CREATED).json(parcel); 
})

export const getParcelsHandler = catchErrors(async (req, res) => {
    const parcels = await parcelModel.find(
        {
            userId: req.userId,
        },
          {
            senderName: 1,
            senderSurname: 1,
            senderPostCode: 1,
            senderCity: 1,
            senderAdress: 1,
            senderCountry: 1,
            name: 1,
            surname: 1,
            city: 1,
            country: 1,
            adress: 1,
            postCode: 1,
            amount: 1,
            cashOnDelivery: 1,
            clientEmail: 1,
            phone: 1,
            numberOfParcel: 1,
          },
    {
        sort: { createdAt: -1 },
    }
);

return res.status(OK).json(parcels.map((parcel) => ({...parcel.toObject()})))
});

export const getCheckStatusHandler = catchErrors(async (req, res) => {   
    const {status} = await findCheckStatus(req.params.number);

    return res.status(OK).json(status);
    });

    export const registerHandler = catchErrors(async (req, res) => {
        const request = UserSchima.parse({
            ...req.body,
            userAgent: req.headers["user-agent"],
        })
        const {newUser} = await createNewUser(request);

    return res.status(CREATED).json(newUser)
    });
