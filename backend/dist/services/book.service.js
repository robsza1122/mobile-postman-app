"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAllParcelOnTrueInList = exports.markAllParcelOnFalseInList = exports.deleteBook = void 0;
const ParcelModel_1 = require("../Models/ParcelModel");
const deleteBook = async ({ numberOfBook }) => {
    await ParcelModel_1.parcelModel.updateMany({ numberOfBook, isDownloaded: false }, {
        $set: { isBooked: false, forUser: "", numberOfBook: "" },
    });
    const updatedParcels = await ParcelModel_1.parcelModel.find({});
    return {
        updatedParcels,
    };
};
exports.deleteBook = deleteBook;
const markAllParcelOnFalseInList = async ({ user, }) => {
    await ParcelModel_1.parcelModel.updateMany({ isBooked: true, forUser: user, isDownloaded: true }, { isMarked: false, isMarkedVERIFICATION: false });
    const changedParcels = await ParcelModel_1.parcelModel.find({
        isBooked: true,
        forUser: user,
        isDownloaded: true,
    });
    return {
        changedParcels,
    };
};
exports.markAllParcelOnFalseInList = markAllParcelOnFalseInList;
const markAllParcelOnTrueInList = async ({ user, }) => {
    await ParcelModel_1.parcelModel.updateMany({ isBooked: true, forUser: user, isDownloaded: true }, { isMarked: true });
    const changedParcels = await ParcelModel_1.parcelModel.find({
        isBooked: true,
        forUser: user,
        isDownloaded: true,
    });
    return {
        changedParcels,
    };
};
exports.markAllParcelOnTrueInList = markAllParcelOnTrueInList;
