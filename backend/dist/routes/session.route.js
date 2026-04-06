"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_1 = require("../controllers/session.controller");
const sessionRoutes = (0, express_1.Router)();
sessionRoutes.get("/", session_controller_1.getSessionHandler);
exports.default = sessionRoutes;
