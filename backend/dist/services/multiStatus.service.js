"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiResults = exports.multiAdvicing = exports.multiDelivery = void 0;
const env_1 = require("../constants/env");
const ParcelModel_1 = require("../Models/ParcelModel");
const getDeliveredEmailTemplate_1 = require("../utils/getDeliveredEmailTemplate");
const sendEmail_1 = require("../utils/sendEmail");
const otherStatusEmail_1 = require("../utils/otherStatusEmail");
const getAdvicingEmail_1 = require("../utils/getAdvicingEmail");
const multiDelivery = async ({ nameOfStatus, createdAt, signature, noAddressee, deliveryInput, user, subject, details, }) => {
    const addStatus = {
        name: nameOfStatus,
        createdAt,
        subject,
        details,
        signature,
        isDeliveryCode: false,
        noAddressee,
        deliveryInput,
        reasonOfAdvice: "",
        officeOfAdvice: "",
        placeOfNotification: "",
    };
    const updatedParcels = await ParcelModel_1.parcelModel.find({
        isMarked: true,
        forUser: user,
    });
    await Promise.all((updatedParcels || []).map((parcel) => parcel?.clientEmail
        ? (0, sendEmail_1.sendEmail)({
            ...(0, getDeliveredEmailTemplate_1.getDeliveredEmailTemplate)(parcel, `${env_1.APP_ORIGIN}/checkStatus/${parcel._id}`),
            to: parcel.clientEmail,
        })
        : Promise.resolve()));
    await ParcelModel_1.parcelModel.updateMany({
        isMarked: true,
        forUser: user,
    }, {
        $set: { isMarked: false },
        $push: { status: addStatus },
    });
    const changedParcels = await ParcelModel_1.parcelModel.find({ forUser: user });
    return { changedParcels };
};
exports.multiDelivery = multiDelivery;
const multiAdvicing = async ({ createdAt, reasonOfAdvice, officeOfAdvice, placeOfNotification, user, }) => {
    const addStatus = {
        name: "ADVICED",
        createdAt,
        subject: "",
        details: "",
        signature: null,
        isDeliveryCode: false,
        noAddressee: false,
        deliveryInput: "",
        reasonOfAdvice,
        officeOfAdvice,
        placeOfNotification,
    };
    const updatedParcels = await ParcelModel_1.parcelModel.find({
        isMarked: true,
        forUser: user,
    });
    await Promise.all((updatedParcels || []).map((parcel) => parcel?.clientEmail
        ? (0, sendEmail_1.sendEmail)({
            ...(0, getAdvicingEmail_1.getAdvicingEmail)(parcel, `${env_1.APP_ORIGIN}/checkStatus/${parcel._id}`),
            to: parcel.clientEmail,
        })
        : Promise.resolve()));
    await ParcelModel_1.parcelModel.updateMany({
        forUser: user,
        isMarked: true,
    }, {
        $set: { isMarked: false },
        $push: { status: addStatus },
    });
    return { updatedParcels };
};
exports.multiAdvicing = multiAdvicing;
const multiResults = async ({ createdAt, subject, details, input, user, }) => {
    const addStatus = {
        name: "OTHER",
        createdAt,
        subject,
        details,
        signature: null,
        isDeliveryCode: false,
        noAddressee: false,
        deliveryInput: input,
        reasonOfAdvice: '',
        officeOfAdvice: '',
        placeOfNotification: '',
    };
    const updatedParcels = await ParcelModel_1.parcelModel.find({
        isMarked: true,
        forUser: user,
    });
    await Promise.all((updatedParcels || []).map((parcel) => parcel?.clientEmail
        ? (0, sendEmail_1.sendEmail)({
            ...(0, otherStatusEmail_1.otherStatusEmail)(parcel, `${env_1.APP_ORIGIN}/checkStatus/${parcel._id}`),
            to: parcel.clientEmail,
        })
        : Promise.resolve()));
    await ParcelModel_1.parcelModel.updateMany({
        forUser: user,
        isMarked: true,
    }, {
        $set: { isMarked: false },
        $push: { status: addStatus },
    });
    return { updatedParcels };
};
exports.multiResults = multiResults;
