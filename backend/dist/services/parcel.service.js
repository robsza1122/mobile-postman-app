"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createOrder = exports.createNewUser = exports.createDeliveryCode = exports.createNumber = exports.date = void 0;
const http_1 = require("../constants/http");
const ParcelModel_1 = require("../Models/ParcelModel");
const SessionModel_1 = __importDefault(require("../Models/SessionModel"));
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const AppAssert_1 = __importDefault(require("../utils/AppAssert"));
const getEMINumber_1 = __importDefault(require("../utils/getEMINumber"));
const jwt_1 = require("../utils/jwt");
const today = new Date();
const currentMonth = today.getMonth() + 1;
exports.date = `Date: ${today.getFullYear()}-${currentMonth.toString().length === 1 ? "0" : ""}${currentMonth}-${today.getDate().toString().length === 1 ? "0" : ""}${today.getDate()} Hour: ${today.getHours().toString().length === 1 ? "0" : ""}${today.getHours()}-${today.getMinutes().toString().length === 1 ? "0" : ""}${today.getMinutes()}-${today.getSeconds().toString().length === 1 ? "0" : ""}${today.getSeconds()}`;
const createNumber = () => (Math.random() * 10000000000000).toFixed(0).toString().slice(0, 12);
exports.createNumber = createNumber;
const createDeliveryCode = () => (Math.random() * 1000000000).toFixed(0).toString().slice(0, 6);
exports.createDeliveryCode = createDeliveryCode;
const createNewUser = async (data) => {
    const duplicatedUser = await UserModel_1.default.exists({
        username: data.username,
    });
    (0, AppAssert_1.default)(!duplicatedUser, http_1.CONFLICT, "User already exists.");
    const { result } = (0, getEMINumber_1.default)(3);
    const newUser = await UserModel_1.default.create({
        username: data.username,
        password: data.password,
        EMINumber: result,
    });
    const newSession = await SessionModel_1.default.create({
        userId: newUser._id,
        userAgent: data.userAgent,
    });
    const refreshToken = (0, jwt_1.signToken)({
        sessionId: newSession._id,
    }, jwt_1.refreshTokenSignOptions);
    const accessToken = (0, jwt_1.signToken)({
        userId: newUser._id,
        sessionId: newSession._id,
    });
    return {
        newUser,
        refreshToken,
        accessToken,
    };
};
exports.createNewUser = createNewUser;
const createOrder = async (data) => {
    const parcel = await ParcelModel_1.parcelModel.create({
        senderName: data.senderName,
        senderSurname: data.senderSurname,
        senderPostCode: data.senderPostCode,
        senderCity: data.senderCity,
        senderAdress: data.senderAdress,
        senderCountry: data.senderCountry,
        name: data.name,
        surname: data.surname,
        city: data.city,
        country: data.country,
        adress: data.adress,
        postCode: data.postCode,
        amount: data.cashOnDelivery ? data.amount : 0,
        cashOnDelivery: data.cashOnDelivery,
        clientEmail: data.clientEmail,
        phone: data.phone,
        amountOfTrials: 0,
        isDownloaded: false,
        isDeliveryCode: false,
        isMarked: false,
        isMarkedVERIFICATION: false,
        deliveryCode: `${(0, exports.createDeliveryCode)()}`,
        placeOfLeavingParcel: "",
        status: {
            name: "ORDERED",
            subject: "",
            details: "",
            createdAt: exports.date,
            isSignature: false,
            signature: null,
            deliveryInput: "",
            noAddressee: false,
            reasonOfAdvice: "",
            officeOfAdvice: "",
            placeOfNotification: "",
        },
        forUser: "",
        isBooked: false,
        numberOfBook: "",
        numberOfParcel: `PX${(0, exports.createNumber)()}`,
    });
    if (data.cashOnDelivery && data.amount === 0) {
        (0, AppAssert_1.default)(data.cashOnDelivery, http_1.CONFLICT, "Amount of money required");
        throw new Error("Amount of money is required");
    }
    return {
        parcel,
    };
};
exports.createOrder = createOrder;
const loginUser = async ({ username, password, userAgent, }) => {
    const loggedUser = await UserModel_1.default.findOne({ username });
    (0, AppAssert_1.default)(loggedUser, http_1.UNAUTHORIZED, "Invalid email or password.");
    const logValidation = await loggedUser.comparePassword(password);
    (0, AppAssert_1.default)(logValidation, http_1.UNAUTHORIZED, "Invalid email or password.");
    const session = await SessionModel_1.default.create({
        userId: loggedUser._id,
        userAgent,
    });
    const sessionInfo = {
        sessionId: session._id,
    };
    const refreshToken = (0, jwt_1.signToken)(sessionInfo, jwt_1.refreshTokenSignOptions);
    const accessToken = (0, jwt_1.signToken)({
        ...sessionInfo,
        userId: loggedUser._id,
    });
    return {
        loggedUser,
        accessToken,
        refreshToken,
    };
};
exports.loginUser = loginUser;
