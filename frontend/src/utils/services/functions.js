export const assignParcelsToBook = (parcels) => {
  return parcels
    .map((parcel) => {
      if (parcel.isMarked) {
        return {
          ...parcel,
          isMarked: false,
          isBooked: true,
          forUser: assignedUser,
          numberOfBook: numberOfDeliveryBook,
        };
      }

      return parcel;
    })
    .filter((parcel) => parcel.numberOfBook === numberOfDeliveryBook);
};
