import { parcelModel } from "../Models/ParcelModel"

type CreateParcelOrder = {
    sender: string,
    adressee: string,
    city: string,
}

export const createOrder = async (data: CreateParcelOrder) => {
    const parcel = await parcelModel.create({
        sender: data.sender,
        adressee: data.adressee,
        city: data.city,

    });

    return {
      parcel
    }
}
