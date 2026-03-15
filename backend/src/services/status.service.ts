import { APP_ORIGIN } from "../constants/env";
import { NOT_FOUND } from "../constants/http";
import { parcelModel } from "../Models/ParcelModel";
import UserModel from "../Models/UserModel";
import { leaveParcelOnPostBranchSchima } from "../schimas/leaveParcelOnPostBranchSchima";
import appAssert from "../utils/AppAssert";
import { getAdvicingEmail } from "../utils/getAdvicingEmail";
import { getDeliveredEmailTemplate } from "../utils/getDeliveredEmailTemplate";
import { getInDeliveryStatusEmail } from "../utils/InDeliveryEmail";
import { otherStatusEmail } from "../utils/otherStatusEmail";
import { sendEmail } from "../utils/sendEmail";

type DifferentStatusType = {
  nameOfStatus: string;
  id: string;
  subject: string;
  details: string;
  signature?: any;
  isDeliveryCode: boolean;
  isSignature: boolean;
  noAddressee?: boolean;
  deliveryInput: string;
  reasonOfAdvice: string;
  officeOfAdvice: string;
  placeOfNotification: string;
  isBooked?: boolean;
  numberOfBook?: string;
  username?: string;
  isDownloaded?: boolean;
  createdAt: string;
};

type InDeliveryType = {
  numberOfBook: string;
  username: string;
  createdAt: string;
};

export const addInDeliveryStatus = async ({
  numberOfBook,
  username,
  createdAt,
}: InDeliveryType) => {
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

  await parcelModel.updateMany(
    { numberOfBook },
    {
      $push: { status: addStatus },
      $set: { isDownloaded: true, forUser: username },
    },
  );

  const assignParcelsToUser = await parcelModel.find({
    isDownloaded: true,
    forUser: username,
  });

  await UserModel.updateOne(
    { username },
    { $push: { parcels: { ...assignParcelsToUser } } },
  );

  await Promise.all(
    (assignParcelsToUser || []).map((parcel) =>
      parcel?.clientEmail
        ? sendEmail({
            ...getInDeliveryStatusEmail(
              parcel,
              `${APP_ORIGIN}/checkStatus/${parcel._id}`,
            ),
            to: parcel.clientEmail,
          })
        : Promise.resolve(),
    ),
  );

  return {
    assignParcelsToUser,
  };
};

export const deliveredStatus = async ({
  nameOfStatus,
  id,
  subject,
  details,
  signature,
  isDeliveryCode,
  noAddressee,
  deliveryInput,
  reasonOfAdvice,
  officeOfAdvice,
  placeOfNotification,
  isBooked,
  numberOfBook,
  username,
  isDownloaded,
  createdAt,
}: DifferentStatusType) => {
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

  const updateParcel = await parcelModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        isBooked,
        numberOfBook,
        isMarked: false,
        forUser: username,
        isDeliveryCode,
      },
      $push: { status: addStatus },
    },
  );

  const updateParcelsForUser = await parcelModel.find({
    isDownloaded,
    forUser: username,
  });

  const updatedUser = await UserModel.findOneAndUpdate(
    { username },
    {
      $set: { parcels: updateParcelsForUser },
    },
  );

  appAssert(updatedUser, NOT_FOUND, "Can not update user");

  const url = `${APP_ORIGIN}/checkStatus/${id}`;

  appAssert(updateParcel, NOT_FOUND, "Wrong id");

  await sendEmail({
    ...getDeliveredEmailTemplate(updateParcel, url),
    to: updateParcel.clientEmail,
  });

  return {
    updatedUser,
  };
};

export const advicedStatus = async ({
  nameOfStatus,
  id,
  subject,
  details,
  signature,
  isDeliveryCode,
  noAddressee,
  deliveryInput,
  reasonOfAdvice,
  officeOfAdvice,
  placeOfNotification,
  isSignature,
  isBooked,
  numberOfBook,
  username,
  isDownloaded,
  createdAt,
}: DifferentStatusType) => {
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

  const updateParcel = await parcelModel.findOneAndUpdate(
    { _id: id },
    {
      $set: { isBooked, numberOfBook, isMarked: false },
      $push: { status: addStatus },
    },
  );

  const updateParcelsForUser = await parcelModel.find({
    isDownloaded,
    forUser: username,
  });

  const updatedUser = await UserModel.findOneAndUpdate(
    { username },
    {
      $set: { parcels: updateParcelsForUser },
    },
  );

  appAssert(updatedUser, NOT_FOUND, "Can not update user");

  appAssert(updateParcel, NOT_FOUND, "Wrong id");
  const url = `${APP_ORIGIN}/checkStatus/${updateParcel._id}`;

  await sendEmail({
    ...getAdvicingEmail(updateParcel, url),
    to: updateParcel.clientEmail,
  });

  return {
    updatedUser,
  };
};

export const otherStatus = async ({
  nameOfStatus,
  id,
  subject,
  details,
  signature,
  isDeliveryCode,
  noAddressee,
  deliveryInput,
  reasonOfAdvice,
  officeOfAdvice,
  placeOfNotification,
  isBooked,
  numberOfBook,
  username,
  isDownloaded,
  createdAt,
}: DifferentStatusType) => {
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

  const updateParcel = await parcelModel.findOneAndUpdate(
    { _id: id },
    {
      $set: { isBooked, numberOfBook, isMarked: false },
      $push: { status: addStatus },
    },
  );

  const updateParcelsForUser = await parcelModel.find({
    isDownloaded,
    forUser: username,
  });

  const updatedUser = await UserModel.findOneAndUpdate(
    { username },
    {
      $set: { parcels: updateParcelsForUser },
    },
  );

  appAssert(updatedUser, NOT_FOUND, "Can not update user");

  appAssert(updateParcel, NOT_FOUND, "Wrong id");
  const url = `${APP_ORIGIN}/checkStatus/${updateParcel._id}`;

  await sendEmail({
    ...otherStatusEmail(updateParcel, url),
    to: updateParcel.clientEmail,
  });

  return {
    updatedUser,
  };
};

type LeaveParcelOnPostBranchParams = {
  user: string;
  officeOfAdvice: string;
};

export const leaveParcelOnPostBranch = async ({
  user,
  officeOfAdvice,
}: LeaveParcelOnPostBranchParams) => {
  await parcelModel.updateMany(
    {
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
    },
    {
      $set: {
        placeOfLeavingParcel: officeOfAdvice,
      },
    },
  );

  const updatedParcels = await parcelModel.find({
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
