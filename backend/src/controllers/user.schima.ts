import { z } from "zod";

const userSchema = z.string().min(6).max(25);

export const loginShema = z.object({
    username: userSchema,
    password: userSchema,
    userAgent: z.string().optional(),
});

export const registerSchima = loginShema.extend({
    confirmPassword: userSchema,
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
});
