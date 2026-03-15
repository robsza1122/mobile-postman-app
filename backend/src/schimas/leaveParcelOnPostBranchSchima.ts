import z from "zod";

export const leaveParcelOnPostBranchSchima = z.object({
    user: z.string(),
    officeOfAdvice: z.string(),
})