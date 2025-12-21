import { z } from "zod";
import { parcelSchima } from "./parcel.schimas";

export const saveParcelToMemorySchima = z.object({
    parcels: z.array(parcelSchima),
    id: z.string(),
})