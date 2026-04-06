"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiResultsSchima = exports.multiAdvicingSchima = exports.multiDeliverySchima = void 0;
const zod_1 = require("zod");
exports.multiDeliverySchima = zod_1.z.object({
    nameOfStatus: zod_1.z.string().optional(),
    createdAt: zod_1.z.string().optional(),
    signature: zod_1.z.string().optional(),
    noAddressee: zod_1.z.boolean().optional(),
    deliveryInput: zod_1.z.string().optional(),
    user: zod_1.z.string().optional(),
    subject: zod_1.z.string().optional(),
    details: zod_1.z.string().optional(),
});
exports.multiAdvicingSchima = zod_1.z.object({
    createdAt: zod_1.z.string(),
    reasonOfAdvice: zod_1.z.string(),
    officeOfAdvice: zod_1.z.string(),
    placeOfNotification: zod_1.z.string(),
    user: zod_1.z.string(),
});
exports.multiResultsSchima = zod_1.z.object({
    createdAt: zod_1.z.string(),
    subject: zod_1.z.string(),
    details: zod_1.z.string(),
    input: zod_1.z.string(),
    user: zod_1.z.string(),
});
