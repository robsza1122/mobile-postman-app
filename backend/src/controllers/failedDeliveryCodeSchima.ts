import z from 'zod';

export const failedDeliveryCodeSchima = z.object({
    id: z.string(),
    amountOfTrials: z.number(),
})