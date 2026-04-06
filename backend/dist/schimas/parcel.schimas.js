"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelSchima = exports.numberSchima = exports.dataSchima = void 0;
const zod_1 = require("zod");
const parcel_service_1 = require("../services/parcel.service");
exports.dataSchima = zod_1.z.string().min(3).max(255);
exports.numberSchima = zod_1.z.string().length(14).optional();
exports.parcelSchima = zod_1.z.object({
    senderName: exports.dataSchima,
    senderSurname: exports.dataSchima,
    senderPostCode: exports.dataSchima,
    senderCity: exports.dataSchima,
    senderAdress: exports.dataSchima,
    senderCountry: exports.dataSchima,
    name: exports.dataSchima,
    surname: exports.dataSchima,
    city: exports.dataSchima,
    country: exports.dataSchima,
    adress: exports.dataSchima,
    postCode: exports.dataSchima,
    numberOfParcel: exports.numberSchima,
    isMarked: zod_1.z.boolean().optional(),
    isMarkedVERIFICATION: zod_1.z.boolean().optional(),
    isSignature: zod_1.z.boolean().optional(),
    signature: zod_1.z.string().optional(),
    deliveryCode: zod_1.z.string().length(6).optional(),
    status: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string().default("ORDERED"),
        createdAt: zod_1.z.string().default(parcel_service_1.date),
        subject: zod_1.z.string().optional(),
        details: zod_1.z.string().optional(),
        deliveryInput: zod_1.z.string().nullable().optional().default(null),
        noAddressee: zod_1.z.boolean().optional(),
        reasonOfAdvice: zod_1.z.string().optional(),
        officeOfAdvice: zod_1.z.string().optional(),
        placeOfNotification: zod_1.z.string().optional(),
    })).optional(),
    forUser: zod_1.z.string().optional(),
    phone: zod_1.z.string().startsWith("+48").length(12).optional(),
    clientEmail: zod_1.z.string().email().min(5).max(255),
    cashOnDelivery: zod_1.z.boolean(),
    amount: zod_1.z.number().max(100000),
    isBooked: zod_1.z.boolean().optional(),
    isDownloaded: zod_1.z.boolean().optional(),
    numberOfBook: zod_1.z.string().optional(),
    userAgent: zod_1.z.string().optional(),
    _id: zod_1.z.unknown().optional(),
});
