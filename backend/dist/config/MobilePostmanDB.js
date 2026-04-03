"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postManDataBase = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/NEW_DATABASE_NAME');
        console.log("Successfully connected with DB");
    }
    catch (error) {
        console.error("Cannot connect to DB", error);
        process.exit(1);
    }
};
exports.default = postManDataBase;
