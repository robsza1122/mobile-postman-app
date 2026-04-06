"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersParcelSchima = void 0;
const zod_1 = __importDefault(require("zod"));
exports.usersParcelSchima = zod_1.default.object({
    username: zod_1.default.string(),
    numberOfBook: zod_1.default.string(),
    createdAt: zod_1.default.string(),
});
