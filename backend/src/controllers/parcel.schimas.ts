import { z } from "zod";
import { date } from "../services/auth.service";

export const dataSchima = z.string().min(3).max(255);
export const numberSchima = z.string().length(12).optional();

export const parcelSchima = z.object({
  senderName: dataSchima,
  senderSurname: dataSchima,
  senderPostCode: dataSchima,
  senderCity: dataSchima,
  senderAdress: dataSchima,
  senderCountry: dataSchima,
  name: dataSchima,
  surname: dataSchima,
  city: dataSchima,
  country: dataSchima,
  adress: dataSchima,
  postCode: dataSchima,
  numberOfParcel: numberSchima,
  isMarked: z.boolean().optional(),
  isSignature: z.boolean().optional(),
  signature: z.string().optional(),
  deliveryCode: z.string().length(6).optional(),
  status: z.array(z.object({
    name: z.string().default("ORDERED"),
    createdAt: z.string().default(date),
    subject: z.string().optional(),
    details: z.string().optional(),
    deliveryInput: z.string().nullable().optional().default(null),
  noAddressee: z.boolean().optional(),
  reasonOfAdvice: z.string().optional(),
  officeOfAdvice: z.string().optional(),
  placeOfNotification: z.string().optional(),
  })).optional(),
  forUser: z.string().optional(),
  phone: z.string().startsWith("+48").length(12).optional(),
  clientEmail: z.string().email().min(5).max(255),
  cashOnDelivery: z.boolean(),
  amount: z.number().max(100000),
  isBooked: z.boolean().optional(),
  idDownloaded: z.boolean().optional(),
  numberOfBook: z.string().optional(),
    userAgent: z.string().optional(),
    _id: z.unknown().optional(),
}); 
