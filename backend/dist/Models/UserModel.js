"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bscrypt_1 = require("../utils/bscrypt");
const userSchima = new mongoose_1.default.Schema({
    EMINumber: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    parcels: {
        type: [mongoose_1.default.Schema.Types.Mixed],
        default: [],
    }
}, {
    timestamps: true,
});
userSchima.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await (0, bscrypt_1.hashValue)(this.password);
    return next();
});
userSchima.methods.comparePassword = async function (val) {
    return (0, bscrypt_1.compareValue)(val, this.password);
};
userSchima.methods.omitPassword = async function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
const UserModel = mongoose_1.default.model("User", userSchima);
exports.default = UserModel;
