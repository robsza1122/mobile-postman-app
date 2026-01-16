import { parcelModel } from "../Models/ParcelModel";

type DeleteBookType = {
  numberOfBook: string;
};

export const deleteBook = async ({ numberOfBook }: DeleteBookType) => {
  await parcelModel.updateMany(
    { numberOfBook, isDownloaded: false },
    {
      $set: { isBooked: false, forUser: "", numberOfBook: "" },
    }
  );

  const updatedParcels = await parcelModel.find({});

  return {
    updatedParcels,
  };
};


type MarkAllParcelInListType = {
  user: string;
};

export const markAllParcelOnFalseInList = async ({
  user,
}: MarkAllParcelInListType) => {
  await parcelModel.updateMany(
    { isBooked: true, forUser: user, isDownloaded: true },
    { isMarked: false, isMarkedVERIFICATION: false }
  );

  const changedParcels = await parcelModel.find({
    isBooked: true,
    forUser: user,
    isDownloaded: true,
  });

  return {
    changedParcels,
  };
};

export const markAllParcelOnTrueInList = async ({
  user,
}: MarkAllParcelInListType) => {
  await parcelModel.updateMany(
    { isBooked: true, forUser: user, isDownloaded: true },
    { isMarked: true }
  );

  const changedParcels = await parcelModel.find({
    isBooked: true,
    forUser: user,
    isDownloaded: true,
  });

  return {
    changedParcels,
  };
};