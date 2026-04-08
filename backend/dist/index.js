"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./constants/env");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("./constants/http");
const MobilePostmanDB_1 = __importDefault(require("./config/MobilePostmanDB"));
const parcel_route_1 = __importDefault(require("./routes/parcel.route"));
const ErrorHandler_1 = __importDefault(require("./middleware/ErrorHandler"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const authenticate_1 = __importDefault(require("./middleware/authenticate"));
const session_route_1 = __importDefault(require("./routes/session.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const multiStatus_route_1 = __importDefault(require("./routes/multiStatus.route"));
const status_route_1 = __importDefault(require("./routes/status.route"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)({
    origin: env_1.APP_ORIGIN,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use(auth_route_1.default);
app.use(multiStatus_route_1.default);
app.use(parcel_route_1.default);
app.use(status_route_1.default);
//protected-routes
app.use("/user", authenticate_1.default, user_route_1.default);
app.use("/sessions", authenticate_1.default, session_route_1.default);
app.use(ErrorHandler_1.default);
app.get("/firstParcel", (_, res) => {
    return res.status(http_1.OK).json({
        name: "first parcel",
    });
});
app.listen(env_1.PORT, async () => {
    console.log(`Server is listening on port ${env_1.PORT} in ${env_1.NODE_ENV}`);
    await (0, MobilePostmanDB_1.default)();
});
