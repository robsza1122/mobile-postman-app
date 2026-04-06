"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveParcelToMemorySchima = void 0;
const zod_1 = require("zod");
const parcel_schimas_1 = require("../schimas/parcel.schimas");
exports.saveParcelToMemorySchima = zod_1.z.object({
    parcels: zod_1.z.array(parcel_schimas_1.parcelSchima),
    id: zod_1.z.string(),
});
