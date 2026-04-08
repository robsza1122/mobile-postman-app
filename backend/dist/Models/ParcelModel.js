"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Data_1 = require("../utils/Data");
;
const parcelSchima = new mongoose_1.default.Schema({
    userId: {
        ref: "User",
        type: mongoose_1.default.Schema.Types.ObjectId,
        index: true,
    },
    userAgent: { type: String },
    senderName: {
        type: String,
        required: true,
    },
    senderSurname: {
        type: String,
        required: true,
    },
    senderPostCode: {
        type: String,
        required: true,
    },
    senderCity: {
        type: String,
        required: true,
    },
    senderAdress: {
        type: String,
        required: true,
    },
    senderCountry: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    postCode: {
        type: String,
        required: true,
    },
    cashOnDelivery: {
        type: Boolean,
        required: true,
        default: false,
    },
    amount: {
        type: Number,
    },
    numberOfParcel: {
        type: String,
    },
    deliveryCode: {
        type: String,
    },
    clientEmail: {
        type: String,
    },
    phone: {
        type: String,
    },
    isMarked: {
        type: Boolean,
        default: false,
    },
    isMarkedVERIFICATION: {
        type: Boolean,
        default: false,
    },
    amountOfTrials: {
        type: Number,
    },
    isDeliveryCode: {
        type: Boolean,
    },
    placeOfLeavingParcel: {
        type: String,
    },
    status: {
        type: [
            {
                name: String,
                createdAt: String,
                details: String,
                subject: String,
                signature: {
                    type: String || null,
                    default: null,
                },
                reasonOfAdvice: String,
                officeOfAdvice: String,
                placeOfNotification: String,
                isSignature: Boolean,
                deliveryInput: String,
                noAddressee: Boolean,
            }
        ],
    },
    isDownloaded: {
        type: Boolean,
    },
    forUser: {
        type: String,
    },
    isBooked: {
        type: Boolean,
    },
    numberOfBook: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    expiresAt: {
        type: Date,
        required: true,
        default: (0, Data_1.threeMonthsFromNow)(),
    },
});
exports.parcelModel = mongoose_1.default.model("Order Parcel", parcelSchima, "parcels");
