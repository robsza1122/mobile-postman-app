import { z } from "zod";

const dataSchima = z.string().min(3).max(255);
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
  phone: z.string().startsWith("+48").length(12),
  clientEmail: z.string().email().min(5).max(255),
  cashOnDelivery: z.boolean(),
  amount: z.number().max(100000),
    userAgent: z.string().optional(),
}); 
