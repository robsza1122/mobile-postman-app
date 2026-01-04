import z from "zod";

export const markParcelSchima = z.object({
    markParcel: z.boolean(),
    id: z.string(),
})
