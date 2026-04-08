"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../constants/env");
const mongoose_1 = __importDefault(require("mongoose"));
const postManDataBase = async () => {
    try {
        await mongoose_1.default.connect(env_1.MONGO_URI || '');
        console.log("Successfully connected with DB");
    }
    catch (error) {
        console.error("Cannot connect to DB", error);
        process.exit(1);
    }
};
exports.default = postManDataBase;
