"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failedDeliveryCode = exports.markParcel = exports.assignParcels = void 0;
const ParcelModel_1 = require("../Models/ParcelModel");
const assignParcels = async ({ numberOfBook, username }) => {
    await ParcelModel_1.parcelModel.updateMany({ isMarked: true, forUser: "" }, {
        $set: {
            isBooked: true,
            isMarked: false,
            numberOfBook,
            forUser: username,
        },
    });
    const assignedParcels = await ParcelModel_1.parcelModel.find({});
    return {
        assignedParcels,
    };
};
exports.assignParcels = assignParcels;
const markParcel = async ({ id, markParcel }) => {
    const markedParcel = await ParcelModel_1.parcelModel.findByIdAndUpdate(id, {
        isMarked: markParcel,
    });
    return {
        markedParcel,
    };
};
exports.markParcel = markParcel;
const failedDeliveryCode = async ({ id, amountOfTrials, }) => {
    const updatedParcel = await ParcelModel_1.parcelModel.findByIdAndUpdate(id, {
        $set: { amountOfTrials },
    });
    return {
        updatedParcel,
    };
};
exports.failedDeliveryCode = failedDeliveryCode;
