export const deliveryStatusWithAddressee = (
  parcel,
  chooseSubject,
  savePoints,
  input,
  date,
) => {
  return {
    nameOfStatus: "DELIVERED",
    id: parcel._id,
    subject: chooseSubject,
    details: "",
    signature: savePoints,
    isDeliveryCode: false,
    isSignature: true,
    noAddressee: false,
    deliveryInput: input.toString(),
    reasonOfAdvice: "",
    officeOfAdvice: "",
    placeOfNotification: "",
    isBooked: true,
    numberOfBook: parcel.numberOfBook,
    isDownloaded: true,
    username: parcel.forUser,
    createdAt: date,
  };
};

export const deliveryStatusWithNoAddressee = (
  parcel,
  chooseSubject,
  particularSubject,
  savePoints,
  input,
  date,
) => {
  return {
    nameOfStatus: "DELIVERED",
    id: parcel._id,
    subject: chooseSubject,
    details: particularSubject,
    signature: savePoints,
    isDeliveryCode: false,
    isSignature: true,
    noAddressee: true,
    deliveryInput:
      particularSubject === "Parcel left in place set with addressee"
        ? input
        : "",
    reasonOfAdvice: "",
    officeOfAdvice: "",
    placeOfNotification: "",
    isBooked: true,
    numberOfBook: parcel.numberOfBook,
    username: parcel.forUser,
    createdAt: date,
    isDownloaded: true,
  };
};

export const deliveryStatusLocally = (
  downloadedParcels,
  updatedParcel,
  date,
  chooseSubject,
  particularSubject,
  input,
  noAddressee,
) => {
  return downloadedParcels.map((parcel) => {
    if (updatedParcel._id === parcel._id) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...parcel.status,
          {
            name: "DELIVERED",
            createdAt: date,
            subject: chooseSubject,
            noAddressee,
            details: "",
            deliveryInput: chooseSubject === "Addressee" ? input : "",
          },
        ],
      };
    }

    return parcel;
  });
};

export const deliveryStatusNoAddresseeLocally = () => {
  return downloadedParcels.map((parcel) => {
    if (findParcel[0]._id === parcel._id) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...parcel.status,
          {
            name: "DELIVERED",
            createdAt: date,
            subject: chooseSubject,
            details: particularSubject,
            noAddressee: true,
            deliveryInput:
              particularSubject === "Parcel left in place set with addressee"
                ? input
                : "",
          },
        ],
      };
    }

    return parcel;
  });
};

export const advicedStatusObject = (
  parcel,
  chooseReason,
  chooseOffice,
  chooseNotifiedPlace,
  date,
) => {
  return {
    nameOfStatus: "ADVICED",
    id: parcel._id,
    subject: "",
    details: "",
    signature: "",
    isDeliveryCode: false,
    isSignature: false,
    noAddressee: false,
    deliveryInput: "",
    reasonOfAdvice: chooseReason,
    officeOfAdvice: chooseOffice,
    placeOfNotification: chooseNotifiedPlace,
    isBooked: true,
    numberOfBook: parcel.numberOfBook,
    isDownloaded: true,
    username: parcel.forUser,
    createdAt: date,
  };
};

export const advicedStatusLocally = (
  downloadedParcels,
  currentParcel,
  date,
  chooseReason,
  chooseOffice,
  chooseNotifiedPlace,
) => {
  return downloadedParcels.map((parcel) => {
    if (parcel._id === currentParcel._id) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...parcel.status,
          {
            name: "ADVICED",
            createdAt: date,
            reasonOfAdvice: chooseReason,
            officeOfAdvice: chooseOffice,
            placeOfNotification: chooseNotifiedPlace,
          },
        ],
      };
    }
    return parcel;
  });
};

export const otherResultStatus = (
  parcel,
  chooseResult,
  chooseDetails,
  input,
  date,
) => {
  return {
    nameOfStatus: "OTHER",
    id: parcel._id,
    subject: chooseResult,
    details: chooseDetails,
    signature: "",
    isDeliveryCode: false,
    isSignature: false,
    noAddressee: false,
    deliveryInput: input,
    reasonOfAdvice: "",
    officeOfAdvice: "",
    placeOfNotification: "",
    isBooked: true,
    numberOfBook: parcel.numberOfBook,
    isDownloaded: true,
    username: parcel.forUser,
    createdAt: date,
  };
};

export const otherStatusLocally = (
  downloadedParcels,
  currentParcel,
  input,
  chooseResult,
  chooseDetails,
  date,
) => {
  return downloadedParcels.map((parcel) => {
    if (parcel._id === currentParcel._id) {
      return {
        ...parcel,
        status: [
          ...parcel.status,
          {
            deliveryInput: input,
            subject: chooseResult,
            details: chooseDetails,
            name: "OTHER",
            createdAt: date,
            reasonOfAdvice: "",
            DetailsOfAdvice: "",
            placeOfNotification: "",
          },
        ],
      };
    }
    return parcel;
  });
};

export const deliveryWithCode = (currentParcel, date) => {
  return {
    nameOfStatus: "DELIVERED",
    id: currentParcel._id,
    subject: "",
    details: "",
    signature: "",
    isDeliveryCode: true,
    noAddressee: false,
    deliveryInput: "",
    reasonOfAdvice: "",
    officeOfAdvice: "",
    placeOfNotification: "",
    isBooked: true,
    numberOfBook: currentParcel.numberOfBook,
    username: currentParcel.forUser,
    isDownloaded: true,
    createdAt: date,
  };
};

export const deliveryWithCodeLocally = (
  downloadedParcels,
  updatedParcel,
  date,
) => {
  return downloadedParcels.map((parcel) => {
    if (updatedParcel._id === parcel._id) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...parcel.status,
          {
            name: "DELIVERED",
            createdAt: date,
            subject: "",
            details: "",
            noAddressee: false,
            deliveryInput: "",
          },
        ],
      };
    }

    return parcel;
  });
};

export const deliverWithCodeQueryClient = (date) => {
  return {
    name: "DELIVERED",
    createdAt: date,
    subject: "",
    details: "",
    signature: null,
    isDeliveryCode: true,
    noAddressee: false,
    deliveryInput: "",
    reasonOfAdvice: "",
    officeOfAdvice: "",
    placeOfNotification: "",
  };
};

export const setNoAddresseLocally = (downloadedParcels, updatedParcel) => {
  return (downloadedParcels || []).map((parcel) => {
    if (updatedParcel._id === parcel._id) {
      return {
        ...parcel,
        noAddressee: false,
      };
    }

    return parcel;
  });
};

export const multiDeliveryLocally = (
  downloadedParcels,
  date,
  chooseSubject,
  details,
  noAddressee,
  input,
) => {
  return downloadedParcels.map((parcel) => {
    if (parcel.isMarked) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...parcel.status,
          {
            name: "DELIVERED",
            createdAt: date,
            subject: chooseSubject,
            noAddressee,
            details,
            deliveryInput: chooseSubject === "Addressee" ? input : "",
          },
        ],
      };
    }
    return parcel;
  });
};

export const multiDeliverStatus = (
  date,
  signature,
  noAddressee,
  input,
  username,
  chooseSubject,
  details,
) => {
  return {
    nameOfStatus: "DELIVERED",
    createdAt: date,
    signature,
    noAddressee,
    deliveryInput: input,
    user: username,
    subject: chooseSubject,
    details,
  };
};

export const clearSignatureByButton = (downloadedParcels, updateParcels) => {
  return downloadedParcels.map((parcel) => {
    if (parcel._id === updateParcels[0]._id) {
      return {
        ...parcel,
        isSignature: false,
        signature: null,
      };
    }

    return parcel;
  });
};

export const multiAdvicedStatus = (
  createdAt,
  reasonOfAdvice,
  placeOfAdvice,
  placeOfNotification,
  user,
) => {
  return {
    createdAt,
    reasonOfAdvice,
    officeOfAdvice: placeOfAdvice,
    placeOfNotification,
    user,
  };
};

export const multiAdvicedStatusLocally = (
  downloadedParcels,
  createdAt,
  reasonOfAdvice,
  officeOfAdvice,
  placeOfNotification,
) => {
  return downloadedParcels.map((parcel) => {
    if (parcel.isMarked) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...parcel.status,
          {
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
          },
        ],
      };
    }

    return parcel;
  });
};

export const multiResults = (
  date,
  chooseResult,
  chooseDetails,
  input,
  user,
) => {
  return {
    createdAt: date,
    result: chooseResult,
    details: chooseDetails,
    input,
    user,
  };
};

export const multiResultsLocally = (
  downloadedParcels,
  createdAt,
  chooseResult,
  chooseDetails,
  input,
) => {
  return downloadedParcels.map((parcel) => {
    if (parcel.isMarked) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...parcel.status,
          {
            name: "OTHER",
            createdAt,
            result: chooseResult,
            details: chooseDetails,
            signature: null,
            isDeliveryCode: false,
            noAddressee: false,
            deliveryInput: input,
            reasonOfAdvice: "",
            officeOfAdvice: "",
            placeOfNotification: "",
          },
        ],
      };
    }

    return parcel;
  });
};
