"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionHandler = void 0;
const http_1 = require("../constants/http");
const SessionModel_1 = __importDefault(require("../Models/SessionModel"));
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
exports.getSessionHandler = (0, catchErrors_1.default)(async (req, res) => {
    const userId = req.userId;
    const sessionId = req.sessionId;
    const sessions = await SessionModel_1.default.find({
        userId,
        expiresAt: { $gt: Date.now() },
    }, {
        _id: 1,
        userAgent: 1,
        createdAt: 1,
        expiresAt: 1,
    });
    return res.status(http_1.OK).json(sessions.map((session) => ({
        ...session.toObject(),
        ...(session.id === sessionId && {
            isCurrent: true,
        }),
    })));
});
