import { z } from "zod";
import { parcelSchima } from "../schimas/parcel.schimas";

export const saveParcelToMemorySchima = z.object({
  parcels: z.array(parcelSchima),
  id: z.string(),
});
