import { z } from "zod";

const userSchema = z.string().min(6).max(25);

export const UserSchima = z.object({
    username: userSchema,
    password: userSchema,
    confirmPassword: userSchema,
});
