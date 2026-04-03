"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeliveryBookSchima = exports.assignParcelSchima = void 0;
const zod_1 = __importDefault(require("zod"));
exports.assignParcelSchima = zod_1.default.object({
    numberOfBook: zod_1.default.string(),
    username: zod_1.default.string()
});
exports.deleteDeliveryBookSchima = zod_1.default.object({
    numberOfBook: zod_1.default.string()
});
