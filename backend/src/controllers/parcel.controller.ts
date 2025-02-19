import { CREATED, OK } from "../constants/http";
import { parcelModel } from "../Models/ParcelModel";
import { createOrder, findCheckStatus } from "../services/auth.service";
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
    })
