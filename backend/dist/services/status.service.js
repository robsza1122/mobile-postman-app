"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveParcelOnPostBranch = exports.otherStatus = exports.advicedStatus = exports.deliveredStatus = exports.addInDeliveryStatus = void 0;
const env_1 = require("../constants/env");
const http_1 = require("../constants/http");
const ParcelModel_1 = require("../Models/ParcelModel");
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const AppAssert_1 = __importDefault(require("../utils/AppAssert"));
const getAdvicingEmail_1 = require("../utils/getAdvicingEmail");
const getDeliveredEmailTemplate_1 = require("../utils/getDeliveredEmailTemplate");
const InDeliveryEmail_1 = require("../utils/InDeliveryEmail");
const otherStatusEmail_1 = require("../utils/otherStatusEmail");
const sendEmail_1 = require("../utils/sendEmail");
const addInDeliveryStatus = async ({ numberOfBook, username, createdAt, }) => {
    const addStatus = {
        name: "IN DELIVERY",
        createdAt,
        subject: "",
        details: "",
        signature: null,
        isDeliveryCode: false,
        isSignature: false,
        noAddressee: false,
        deliveryInput: "",
        reasonOfAdvice: "",
        officeOfAdvice: "",
        placeOfNotification: "",
    };
    await ParcelModel_1.parcelModel.updateMany({ numberOfBook }, {
        $push: { status: addStatus },
        $set: { isDownloaded: true, forUser: username },
    });
    const assignParcelsToUser = await ParcelModel_1.parcelModel.find({
        isDownloaded: true,
        forUser: username,
    });
    await UserModel_1.default.updateOne({ username }, { $push: { parcels: { ...assignParcelsToUser } } });
    await Promise.all((assignParcelsToUser || []).map((parcel) => parcel?.clientEmail
        ? (0, sendEmail_1.sendEmail)({
            ...(0, InDeliveryEmail_1.getInDeliveryStatusEmail)(parcel, `${env_1.APP_ORIGIN}/checkStatus/${parcel._id}`),
            to: parcel.clientEmail,
        })
        : Promise.resolve()));
    return {
        assignParcelsToUser,
    };
};
exports.addInDeliveryStatus = addInDeliveryStatus;
const deliveredStatus = async ({ nameOfStatus, id, subject, details, signature, isDeliveryCode, noAddressee, deliveryInput, reasonOfAdvice, officeOfAdvice, placeOfNotification, isBooked, numberOfBook, username, isDownloaded, createdAt, }) => {
    const addStatus = {
        name: nameOfStatus,
        createdAt,
        subject,
        details,
        signature,
        isDeliveryCode,
        noAddressee,
        deliveryInput,
        reasonOfAdvice,
        officeOfAdvice,
        placeOfNotification,
    };
    const updateParcel = await ParcelModel_1.parcelModel.findOneAndUpdate({ _id: id }, {
        $set: {
            isBooked,
            numberOfBook,
            isMarked: false,
            forUser: username,
            isDeliveryCode,
        },
        $push: { status: addStatus },
    });
    const updateParcelsForUser = await ParcelModel_1.parcelModel.find({
        isDownloaded,
        forUser: username,
    });
    const updatedUser = await UserModel_1.default.findOneAndUpdate({ username }, {
        $set: { parcels: updateParcelsForUser },
    });
    (0, AppAssert_1.default)(updatedUser, http_1.NOT_FOUND, "Can not update user");
    const url = `${env_1.APP_ORIGIN}/checkStatus/${id}`;
    (0, AppAssert_1.default)(updateParcel, http_1.NOT_FOUND, "Wrong id");
    await (0, sendEmail_1.sendEmail)({
        ...(0, getDeliveredEmailTemplate_1.getDeliveredEmailTemplate)(updateParcel, url),
        to: updateParcel.clientEmail,
    });
    return {
        updatedUser,
    };
};
exports.deliveredStatus = deliveredStatus;
const advicedStatus = async ({ nameOfStatus, id, subject, details, signature, isDeliveryCode, noAddressee, deliveryInput, reasonOfAdvice, officeOfAdvice, placeOfNotification, isSignature, isBooked, numberOfBook, username, isDownloaded, createdAt, }) => {
    const addStatus = {
        name: nameOfStatus,
        createdAt,
        subject,
        details,
        signature,
        isSignature,
        isDeliveryCode,
        noAddressee,
        deliveryInput,
        reasonOfAdvice,
        officeOfAdvice,
        placeOfNotification,
    };
    const updateParcel = await ParcelModel_1.parcelModel.findOneAndUpdate({ _id: id }, {
        $set: { isBooked, numberOfBook, isMarked: false },
        $push: { status: addStatus },
    });
    const updateParcelsForUser = await ParcelModel_1.parcelModel.find({
        isDownloaded,
        forUser: username,
    });
    const updatedUser = await UserModel_1.default.findOneAndUpdate({ username }, {
        $set: { parcels: updateParcelsForUser },
    });
    (0, AppAssert_1.default)(updatedUser, http_1.NOT_FOUND, "Can not update user");
    (0, AppAssert_1.default)(updateParcel, http_1.NOT_FOUND, "Wrong id");
    const url = `${env_1.APP_ORIGIN}/checkStatus/${updateParcel._id}`;
    await (0, sendEmail_1.sendEmail)({
        ...(0, getAdvicingEmail_1.getAdvicingEmail)(updateParcel, url),
        to: updateParcel.clientEmail,
    });
    return {
        updatedUser,
    };
};
exports.advicedStatus = advicedStatus;
const otherStatus = async ({ nameOfStatus, id, subject, details, signature, isDeliveryCode, noAddressee, deliveryInput, reasonOfAdvice, officeOfAdvice, placeOfNotification, isBooked, numberOfBook, username, isDownloaded, createdAt, }) => {
    const addStatus = {
        name: nameOfStatus,
        createdAt,
        subject,
        details,
        signature,
        isDeliveryCode,
        noAddressee,
        deliveryInput,
        reasonOfAdvice,
        officeOfAdvice,
        placeOfNotification,
    };
    const updateParcel = await ParcelModel_1.parcelModel.findOneAndUpdate({ _id: id }, {
        $set: { isBooked, numberOfBook, isMarked: false },
        $push: { status: addStatus },
    });
    const updateParcelsForUser = await ParcelModel_1.parcelModel.find({
        isDownloaded,
        forUser: username,
    });
    const updatedUser = await UserModel_1.default.findOneAndUpdate({ username }, {
        $set: { parcels: updateParcelsForUser },
    });
    (0, AppAssert_1.default)(updatedUser, http_1.NOT_FOUND, "Can not update user");
    (0, AppAssert_1.default)(updateParcel, http_1.NOT_FOUND, "Wrong id");
    const url = `${env_1.APP_ORIGIN}/checkStatus/${updateParcel._id}`;
    await (0, sendEmail_1.sendEmail)({
        ...(0, otherStatusEmail_1.otherStatusEmail)(updateParcel, url),
        to: updateParcel.clientEmail,
    });
    return {
        updatedUser,
    };
};
exports.otherStatus = otherStatus;
const leaveParcelOnPostBranch = async ({ user, officeOfAdvice, }) => {
    await ParcelModel_1.parcelModel.updateMany({
        $expr: {
            $and: [
                { $eq: [{ $arrayElemAt: ["$status.name", -1] }, "ADVICED"] },
                {
                    $eq: [
                        { $arrayElemAt: ["$status.officeOfAdvice", -1] },
                        officeOfAdvice,
                    ],
                },
            ],
        },
        placeOfLeavingParcel: "",
        forUser: user,
        isDownloaded: true,
    }, {
        $set: {
            placeOfLeavingParcel: officeOfAdvice,
        },
    });
    const updatedParcels = await ParcelModel_1.parcelModel.find({
        $expr: {
            $and: [
                { $eq: [{ $arrayElemAt: ["$status.name", -1] }, "ADVICED"] },
                {
                    $eq: [
                        { $arrayElemAt: ["$status.officeOfAdvice", -1] },
                        officeOfAdvice,
                    ],
                },
            ],
        },
        placeOfLeavingParcel: "",
        forUser: user,
        isDownloaded: true,
    });
    return {
        updatedParcels,
    };
};
exports.leaveParcelOnPostBranch = leaveParcelOnPostBranch;
