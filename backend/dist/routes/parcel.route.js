"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parcel_controller_1 = require("../controllers/parcel.controller");
const parcelRoutes = (0, express_1.Router)();
parcelRoutes.post("/orderParcel", parcel_controller_1.orderedParcelHandler);
parcelRoutes.get("/getParcels", parcel_controller_1.getParcelsHandler);
// Handling user
parcelRoutes.get("/showAllUsers", parcel_controller_1.showUsersHandler);
// Displaying status in email
parcelRoutes.post("/checkStatus/:id", parcel_controller_1.checkStatusHandler);
parcelRoutes.post("/sendInDeliveryEmail/:id", parcel_controller_1.inDeliveryEmailHandler);
//Creating new book
parcelRoutes.post("/assignParcelsToUser", parcel_controller_1.assignParcelsHandler);
parcelRoutes.post("/deleteBook", parcel_controller_1.deleteBookHandler);
//Marking parcels in different places
parcelRoutes.post("/markParcel", parcel_controller_1.markParcelHandler);
parcelRoutes.post("/markAllParcelsOnTrueForBook", parcel_controller_1.markingOnTrueInBookHandler);
parcelRoutes.post("/markAllParcelsOnFalseForBook", parcel_controller_1.markingOnFalseInBookHandler);
parcelRoutes.post("/markAllParcelOnTrueInList", parcel_controller_1.markingOnTrueInListHandler);
parcelRoutes.post("/markAllParcelOnFalseInList", parcel_controller_1.markingOnFalseInListHandler);
parcelRoutes.post("/markParcelVERIFICATION", parcel_controller_1.markParcelInVerificationHandler);
parcelRoutes.post("/removingParcelsVERIFICATION", parcel_controller_1.removeParcelsInVerificationHandler);
// Leaving parcel on post branch
parcelRoutes.post('/leaveParcelOnPostBranch', parcel_controller_1.leaveParcelOnPostBranchHandler);
//Deleting all dates
parcelRoutes.post("/deleteAllDates", parcel_controller_1.clearDatesHandler);
exports.default = parcelRoutes;
