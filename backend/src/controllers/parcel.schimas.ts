import { z } from "zod";

const dataSchima = z.string().min(6).max(255);

export const parcelSchima = z.object({
    sender: dataSchima,
    adressee: dataSchima,
    city: dataSchima,
    status: dataSchima,
    userAgent: z.string().optional(),
});

