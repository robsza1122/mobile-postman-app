import z from "zod";

export const assignParcelSchima = z.object({
    numberOfBook: z.string(),
    username: z.string()
})

export const deleteDeliveryBookSchima = z.object({
    numberOfBook: z.string()
})