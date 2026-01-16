import { Document } from "mongoose";
import { APP_ORIGIN } from "../constants/env";
import { ParcelDocument, parcelModel } from "../Models/ParcelModel";
import { getDeliveredEmailTemplate } from "../utils/getDeliveredEmailTemplate";
import { sendEmail } from "../utils/sendEmail";
import { otherStatusEmail } from "../utils/otherStatusEmail";
import { getAdvicingEmail } from "../utils/getAdvicingEmail";

type MultiStatusType = {
  nameOfStatus?: string;
  createdAt?: string;
  signature?: string;
  noAddressee?: boolean;
  deliveryInput?: string;
  user?: string;
  subject?: string;
  details?: string;
};

export const multiDelivery = async ({
  nameOfStatus,
  createdAt,
  signature,
  noAddressee,
  deliveryInput,
  user,
  subject,
  details,
}: MultiStatusType) => {
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
  const updatedParcels = await parcelModel.find({
    isMarked: true,
    forUser: user,
  });
  await Promise.all(
    (updatedParcels || []).map((parcel) =>
      parcel?.clientEmail
        ? sendEmail({
            ...getDeliveredEmailTemplate(
              parcel,
              `${APP_ORIGIN}/checkStatus/${parcel._id}`
            ),
            to: parcel.clientEmail,
          })
        : Promise.resolve()
    )
  );
  await parcelModel.updateMany(
    {
      isMarked: true,
      forUser: user,
    },
    {
      $set: { isMarked: false },
      $push: { status: addStatus },
    }
  );

  const changedParcels = await parcelModel.find({ forUser: user });

  return { changedParcels };
};

type MultiAdvicingType = {
  createdAt: string;
  reasonOfAdvice: string;
  officeOfAdvice: string;
  placeOfNotification: string;
  user: string;
};

export const multiAdvicing = async ({
  createdAt,
  reasonOfAdvice,
  officeOfAdvice,
  placeOfNotification,
  user,
}: MultiAdvicingType) => {
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
  const updatedParcels = await parcelModel.find({
    isMarked: true,
    forUser: user,
  });
  await Promise.all(
    (updatedParcels || []).map((parcel) =>
      parcel?.clientEmail
        ? sendEmail({
            ...getAdvicingEmail(
              parcel,
              `${APP_ORIGIN}/checkStatus/${parcel._id}`
            ),
            to: parcel.clientEmail,
          })
        : Promise.resolve()
    )
  );
  await parcelModel.updateMany(
    {
      forUser: user,
      isMarked: true,
    },
    {
      $set: { isMarked: false },
      $push: { status: addStatus },
    }
  );

  return { updatedParcels };
};

type OtherOptionType = {
  createdAt: string;
  result: string;
  details: string;
  input: string;
  user: string;
}

export const multiResults = async ({
  createdAt,
  result,
  details,
  input,
  user,

}: OtherOptionType) => {
  const addStatus = {
    name: "OTHER",
    createdAt,
    result,
    details,
    signature: null,
    isDeliveryCode: false,
    noAddressee: false,
    deliveryInput: input,
    reasonOfAdvice: '',
    officeOfAdvice: '',
    placeOfNotification: '',
  };
  const updatedParcels = await parcelModel.find({
    isMarked: true,
    forUser: user,
  });
  await Promise.all(
    (updatedParcels || []).map((parcel) =>
      parcel?.clientEmail
        ? sendEmail({
            ...otherStatusEmail(
              parcel,
              `${APP_ORIGIN}/checkStatus/${parcel._id}`
            ),
            to: parcel.clientEmail,
          })
        : Promise.resolve()
    )
  );
  await parcelModel.updateMany(
    {
      forUser: user,
      isMarked: true,
    },
    {
      $set: { isMarked: false },
      $push: { status: addStatus },
    }
  );

  return { updatedParcels };
}

