"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parcel_controller_1 = require("../controllers/parcel.controller");
const multiStatusRoutes = (0, express_1.Router)();
multiStatusRoutes.post("/multiDelivery", parcel_controller_1.multiDeliveryHandler);
multiStatusRoutes.post("/multiAdvicing", parcel_controller_1.multiAdvicingHandler);
multiStatusRoutes.post("/multiResults", parcel_controller_1.multiResultsHandler);
exports.default = multiStatusRoutes;
