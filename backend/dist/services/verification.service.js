"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeParcelsInVerification = exports.markParcelInVerification = void 0;
const ParcelModel_1 = require("../Models/ParcelModel");
const markParcelInVerification = async ({ id, markParcel, }) => {
    const changedParcel = await ParcelModel_1.parcelModel.findByIdAndUpdate(id, {
        isMarkedVERIFICATION: markParcel,
    });
    return {
        changedParcel,
    };
};
exports.markParcelInVerification = markParcelInVerification;
const removeParcelsInVerification = async ({ user, }) => {
    await ParcelModel_1.parcelModel.updateMany({
        forUser: user,
        isDownloaded: true,
        isMarkedVERIFICATION: true,
    }, {
        isMarkedVERIFICATION: false,
    });
    const updatedParcels = await ParcelModel_1.parcelModel.find({
        forUser: user,
        isDownloaded: true,
    });
    return {
        updatedParcels,
    };
};
exports.removeParcelsInVerification = removeParcelsInVerification;
