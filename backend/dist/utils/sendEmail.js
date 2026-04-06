"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const resend_1 = __importDefault(require("../config/resend"));
const env_1 = require("../constants/env");
const getFromEmail = () => env_1.NODE_ENV === "mobile_postman" ? "onboarding@resend.dev" : env_1.EMAIL_SENDER;
// const getToEmail = (to: string) => NODE_ENV === "mobile_postman" ? "delivered@resend.dev" : to;
const sendEmail = async ({ to, subject, text, html }) => await resend_1.default.emails.send({
    from: getFromEmail(),
    to: [to],
    subject,
    text,
    html,
});
exports.sendEmail = sendEmail;
