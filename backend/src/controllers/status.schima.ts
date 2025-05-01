import { z } from "zod"

export const statusSchima = z.object({
        nameOfStatus: z.string(),
        id: z.string(),
        subject: z.string().optional().default(''),
        details: z.string().optional().default(''),
        signature: z.any().optional().default(null),
        isSignature: z.boolean().default(false),
        isDeliveryCode: z.boolean().default(false),
        noAddressee: z.boolean().optional(),
        deliveryInput: z.string(),
        reasonOfAdvice: z.string().optional().default(''),
        officeOfAdvice: z.string().optional().default(''),
        placeOfNotification: z.string().optional().default(''),
        numberOfBook: z.string().optional(),
        isBooked: z.boolean().optional(),
        username: z.string().optional(),
        isDownloaded: z.boolean().optional(),
    });
