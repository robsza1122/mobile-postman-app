import z from "zod";

export const usersParcelSchima = z.object({
    username: z.string(),
    numberOfBook: z.string(),
    createdAt: z.string(),
})
