import { z } from "zod";
import { parcelSchima } from "./parcel.schimas";

const userSchema = z.string().min(6).max(25);

export const loginShema = z.object({
    username: userSchema,
    password: userSchema,
    parcels: z.array(parcelSchima).optional().default([]),
    userAgent: z.string().optional(),
});

export const registerSchima = loginShema.extend({
    confirmPassword: userSchema,
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
});
