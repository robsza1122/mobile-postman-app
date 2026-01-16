import { parcelModel } from "../Models/ParcelModel";

type MarkInVerification = {
  id: string;
  markParcel: boolean;
};

type MarkAllParcelInListType = {
    user: string;
}

export const markParcelInVerification = async ({
  id,
  markParcel,
}: MarkInVerification) => {
  const changedParcel = await parcelModel.findByIdAndUpdate(id, {
    isMarkedVERIFICATION: markParcel,
  });

  return {
    changedParcel,
  };
};

export const removeParcelsInVerification = async ({
  user,
}: MarkAllParcelInListType) => {
  await parcelModel.updateMany(
    {
      forUser: user,
      isDownloaded: true,
      isMarkedVERIFICATION: true,
    },
    {
      isMarkedVERIFICATION: false,
    }
  );

  const updatedParcels = await parcelModel.find({
    forUser: user,
    isDownloaded: true,
  });

  return {
    updatedParcels,
  };
};