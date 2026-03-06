import { z } from "zod";

export const multiDeliverySchima = z.object({
    nameOfStatus: z.string().optional(),
    createdAt: z.string().optional(),
    signature: z.string().optional(),
    noAddressee: z.boolean().optional(),
    deliveryInput: z.string().optional(),
    user: z.string().optional(),
    subject: z.string().optional(),
    details: z.string().optional(),
})

export const multiAdvicingSchima = z.object({
      createdAt: z.string(),
  reasonOfAdvice: z.string(),
  officeOfAdvice: z.string(),
  placeOfNotification: z.string(),
  user: z.string(),
})

export const multiResultsSchima = z.object({
    createdAt: z.string(),
  subject: z.string(),
  details: z.string(),
  input: z.string(),
  user: z.string(),
})