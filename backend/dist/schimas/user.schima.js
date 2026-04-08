"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchima = exports.loginShema = void 0;
const zod_1 = require("zod");
const parcel_schimas_1 = require("../schimas/parcel.schimas");
const userSchema = zod_1.z.string().min(6).max(25);
exports.loginShema = zod_1.z.object({
    username: userSchema,
    password: userSchema,
    parcels: zod_1.z.array(parcel_schimas_1.parcelSchima).optional().default([]),
    userAgent: zod_1.z.string().optional(),
});
exports.registerSchima = exports.loginShema
    .extend({
    confirmPassword: userSchema,
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
