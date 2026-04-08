"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveParcelOnPostBranchHandler = exports.multiResultsHandler = exports.multiAdvicingHandler = exports.multiDeliveryHandler = exports.clearDatesHandler = exports.deleteBookHandler = exports.removeParcelsInVerificationHandler = exports.markParcelInVerificationHandler = exports.markingOnTrueInListHandler = exports.markingOnFalseInListHandler = exports.markingOnFalseInBookHandler = exports.markingOnTrueInBookHandler = exports.markParcelHandler = exports.assignParcelsHandler = exports.showUsersHandler = exports.inDeliveryEmailHandler = exports.otherResultHandler = exports.advicedStatusHandler = exports.failedDeliveryCodeHandler = exports.deliveredStatusHandler = exports.addInDeliveryStatusHandler = exports.checkStatusHandler = exports.getParcelsHandler = exports.orderedParcelHandler = void 0;
const env_1 = require("../constants/env");
const http_1 = require("../constants/http");
const ParcelModel_1 = require("../Models/ParcelModel");
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const AppAssert_1 = __importDefault(require("../utils/AppAssert"));
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const emailTemplate_1 = require("../utils/emailTemplate");
const InDeliveryEmail_1 = require("../utils/InDeliveryEmail");
const sendEmail_1 = require("../utils/sendEmail");
const parcel_schimas_1 = require("../schimas/parcel.schimas");
const status_schima_1 = require("../schimas/status.schima");
const usersparcel_schima_1 = require("../schimas/usersparcel.schima");
const assignparcels_schima_1 = require("../schimas/assignparcels.schima");
const markparcel_schima_1 = require("../schimas/markparcel.schima");
const failedDeliveryCodeSchima_1 = require("../schimas/failedDeliveryCodeSchima");
const markAllParcelInListSchima_1 = require("../schimas/markAllParcelInListSchima");
const multiStatus_schima_1 = require("../schimas/multiStatus.schima");
const parcel_service_1 = require("../services/parcel.service");
const multiStatus_service_1 = require("../services/multiStatus.service");
const status_service_1 = require("../services/status.service");
const check_service_1 = require("../services/check.service");
const verification_service_1 = require("../services/verification.service");
const book_service_1 = require("../services/book.service");
const leaveParcelOnPostBranchSchima_1 = require("../schimas/leaveParcelOnPostBranchSchima");
exports.orderedParcelHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = parcel_schimas_1.parcelSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { parcel } = await (0, parcel_service_1.createOrder)(request);
    const url = `${env_1.APP_ORIGIN}/checkStatus/${parcel._id}`;
    await (0, sendEmail_1.sendEmail)({
        ...(0, emailTemplate_1.getDeliveryEmailTemplate)(parcel, url),
        to: parcel.clientEmail,
    });
    res.status(http_1.CREATED).json(parcel);
});
exports.getParcelsHandler = (0, catchErrors_1.default)(async (req, res) => {
    const parcels = await ParcelModel_1.parcelModel.find({
        userId: req.userId,
    }, {
        senderName: 1,
        senderSurname: 1,
        senderPostCode: 1,
        senderCity: 1,
        senderAdress: 1,
        senderCountry: 1,
        name: 1,
        surname: 1,
        city: 1,
        country: 1,
        adress: 1,
        postCode: 1,
        amount: 1,
        cashOnDelivery: 1,
        clientEmail: 1,
        phone: 1,
        numberOfParcel: 1,
        isMarked: 1,
        isMarkedVERIFICATION: 1,
        deliveryCode: 1,
        amountOfTrials: 1,
        isDownloaded: 1,
        isDeliveryCode: 1,
        placeOfLeavingParcel: 1,
        status: 1,
        isBooked: 1,
        numberOfBook: 1,
        forUser: 1,
    }, {
        sort: { createdAt: -1 },
    });
    return res
        .status(http_1.OK)
        .json(parcels.map((parcel) => ({ ...parcel.toObject() })));
});
exports.checkStatusHandler = (0, catchErrors_1.default)(async (req, res) => {
    const checkedParcel = await ParcelModel_1.parcelModel.findById(req.params.id);
    (0, AppAssert_1.default)(checkedParcel, http_1.NOT_FOUND, "Parcel not found");
    return res.status(http_1.OK).json(checkedParcel);
});
exports.addInDeliveryStatusHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = usersparcel_schima_1.usersParcelSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { assignParcelsToUser } = await (0, status_service_1.addInDeliveryStatus)(request);
    return res.status(http_1.OK).json(assignParcelsToUser);
});
exports.deliveredStatusHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = status_schima_1.statusSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { updatedUser } = await (0, status_service_1.deliveredStatus)(request);
    return res.status(http_1.OK).json(updatedUser);
});
exports.failedDeliveryCodeHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = failedDeliveryCodeSchima_1.failedDeliveryCodeSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { updatedParcel } = await (0, check_service_1.failedDeliveryCode)(request);
    return res.status(http_1.OK).json(updatedParcel);
});
exports.advicedStatusHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = status_schima_1.statusSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { updatedUser } = await (0, status_service_1.advicedStatus)(request);
    return res.status(http_1.OK).json(updatedUser);
});
exports.otherResultHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = status_schima_1.statusSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { updatedUser } = await (0, status_service_1.otherStatus)(request);
    return res.status(http_1.OK).json(updatedUser);
});
exports.inDeliveryEmailHandler = (0, catchErrors_1.default)(async (req, res) => {
    const sendEmailById = await ParcelModel_1.parcelModel.findById(req.params.id);
    (0, AppAssert_1.default)(sendEmailById, http_1.NOT_FOUND, "Email not found");
    const url = `${env_1.APP_ORIGIN}/checkStatus/${req.params.id}`;
    await (0, sendEmail_1.sendEmail)({
        ...(0, InDeliveryEmail_1.getInDeliveryStatusEmail)(sendEmailById, url),
        to: sendEmailById.clientEmail,
    });
    (0, AppAssert_1.default)(sendEmailById, http_1.NOT_FOUND, "Parcel not found");
    return res.status(http_1.OK).json({
        message: "Email was successfully sent",
    });
});
exports.showUsersHandler = (0, catchErrors_1.default)(async (req, res) => {
    const users = await UserModel_1.default.find({
        userId: req.userId,
    }, {
        username: 1,
        password: 1,
        EMINumber: 1,
    }, {
        sort: { createdAt: -1 },
    });
    return res.status(http_1.OK).json(users.map((user) => ({ ...user.toObject() })));
});
exports.assignParcelsHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = assignparcels_schima_1.assignParcelSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { assignedParcels } = await (0, check_service_1.assignParcels)(request);
    return res.status(http_1.OK).json(assignedParcels);
});
exports.markParcelHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = markparcel_schima_1.markParcelSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { markedParcel } = await (0, check_service_1.markParcel)(request);
    return res.status(http_1.OK).json(markedParcel);
});
exports.markingOnTrueInBookHandler = (0, catchErrors_1.default)(async (req, res) => {
    await ParcelModel_1.parcelModel.updateMany({ isBooked: false }, {
        $set: { isMarked: true },
    });
    const updateParcels = await ParcelModel_1.parcelModel.find({});
    res.status(http_1.OK).json(updateParcels);
});
exports.markingOnFalseInBookHandler = (0, catchErrors_1.default)(async (req, res) => {
    await ParcelModel_1.parcelModel.updateMany({ isBooked: false }, {
        $set: { isMarked: false },
    });
    const updateParcels = await ParcelModel_1.parcelModel.find({});
    res.status(http_1.OK).json(updateParcels);
});
exports.markingOnFalseInListHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = markAllParcelInListSchima_1.markAllParcelInListSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { changedParcels } = await (0, book_service_1.markAllParcelOnFalseInList)(request);
    res.status(http_1.OK).json(changedParcels);
});
exports.markingOnTrueInListHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = markAllParcelInListSchima_1.markAllParcelInListSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { changedParcels } = await (0, book_service_1.markAllParcelOnTrueInList)(request);
    res.status(http_1.OK).json(changedParcels);
});
exports.markParcelInVerificationHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = markparcel_schima_1.markParcelSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { changedParcel } = await (0, verification_service_1.markParcelInVerification)(request);
    res.status(http_1.OK).json(changedParcel);
});
exports.removeParcelsInVerificationHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = markAllParcelInListSchima_1.markAllParcelInListSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { updatedParcels } = await (0, verification_service_1.removeParcelsInVerification)(request);
    res.status(http_1.OK).json(updatedParcels);
});
exports.deleteBookHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = assignparcels_schima_1.deleteDeliveryBookSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { updatedParcels } = await (0, book_service_1.deleteBook)(request);
    return res.status(http_1.OK).json(updatedParcels);
});
exports.clearDatesHandler = (0, catchErrors_1.default)(async (req, res) => {
    const orderStatus = {
        name: "ORDERED",
        createdAt: parcel_service_1.date,
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
    await ParcelModel_1.parcelModel.updateMany({}, {
        $set: {
            status: orderStatus,
            isBooked: false,
            isDownloaded: false,
            forUser: "",
            numberOfBook: "",
            isMarked: false,
            amountOfTrials: 0,
            placeOfLeavingParcel: "",
        },
    });
    await UserModel_1.default.updateMany({}, {
        $set: { parcels: [] },
    });
    return res.status(http_1.OK).json({
        message: "Book is successfully cleared",
    });
});
exports.multiDeliveryHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = multiStatus_schima_1.multiDeliverySchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { changedParcels } = await (0, multiStatus_service_1.multiDelivery)(request);
    res.status(http_1.OK).json(changedParcels);
});
exports.multiAdvicingHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = multiStatus_schima_1.multiAdvicingSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { updatedParcels } = await (0, multiStatus_service_1.multiAdvicing)(request);
    res.status(http_1.OK).json(updatedParcels);
});
exports.multiResultsHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = multiStatus_schima_1.multiResultsSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { updatedParcels } = await (0, multiStatus_service_1.multiResults)(request);
    res.status(http_1.OK).json(updatedParcels);
});
exports.leaveParcelOnPostBranchHandler = (0, catchErrors_1.default)(async (req, res) => {
    const request = leaveParcelOnPostBranchSchima_1.leaveParcelOnPostBranchSchima.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { updatedParcels } = await (0, status_service_1.leaveParcelOnPostBranch)(request);
    res.status(http_1.OK).json(updatedParcels);
});
