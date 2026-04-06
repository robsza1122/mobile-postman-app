"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusSchima = void 0;
const zod_1 = require("zod");
exports.statusSchima = zod_1.z.object({
    nameOfStatus: zod_1.z.string(),
    id: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    subject: zod_1.z.string().optional().default(''),
    details: zod_1.z.string().optional().default(''),
    signature: zod_1.z.any().optional().default(null),
    isSignature: zod_1.z.boolean().default(false),
    isDeliveryCode: zod_1.z.boolean().default(false),
    noAddressee: zod_1.z.boolean().optional(),
    deliveryInput: zod_1.z.string(),
    reasonOfAdvice: zod_1.z.string().optional().default(''),
    officeOfAdvice: zod_1.z.string().optional().default(''),
    placeOfNotification: zod_1.z.string().optional().default(''),
    numberOfBook: zod_1.z.string().optional(),
    isBooked: zod_1.z.boolean().optional(),
    username: zod_1.z.string().optional(),
    isDownloaded: zod_1.z.boolean().optional(),
});
