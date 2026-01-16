import { parcelModel } from "../Models/ParcelModel";

type AssignType = {
  numberOfBook: string;
  username: string;
};

export const assignParcels = async ({ numberOfBook, username }: AssignType) => {
  await parcelModel.updateMany(
    { isMarked: true, forUser: "" },
    {
      $set: {
        isBooked: true,
        isMarked: false,
        numberOfBook,
        forUser: username,
      },
    }
  );

  const assignedParcels = await parcelModel.find({});

  return {
    assignedParcels,
  };
};

type MarkParcelType = {
  id: string;
  markParcel: boolean;
};

export const markParcel = async ({ id, markParcel }: MarkParcelType) => {
  const markedParcel = await parcelModel.findByIdAndUpdate(id, {
    isMarked: markParcel,
  });

  return {
    markedParcel,
  };
};

type FailedDeliveryCodeType = {
  id: string;
  amountOfTrials: number;
};

export const failedDeliveryCode = async ({
  id,
  amountOfTrials,
}: FailedDeliveryCodeType) => {
  const updatedParcel = await parcelModel.findByIdAndUpdate(id, {
    $set: { amountOfTrials },
  });

  return {
    updatedParcel,
  };
};