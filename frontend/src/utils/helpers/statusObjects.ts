import { CreateParcelOrder } from "../../../src/types/parcel.type";

export type deliveryStatusType = {
  parcel: CreateParcelOrder;
  chooseSubject: string;
  particularSubject?: string;
  savePoints: string;
  input: string | number;
  date: string;
};

export type deliveryStatusLocallyType = {
  downloadedParcels: CreateParcelOrder[];
  updatedParcel: CreateParcelOrder;
  date: string;
  chooseSubject: string;
  particularSubject: string;
  input: string | number;
  noAddressee: boolean;
};

export type advicedStatusObjectType = {
  parcel: CreateParcelOrder;
  chooseReason: string;
  chooseOffice: string;
  chooseNotifiedPlace: string;
  date: string;
};

export type advicedStatusLocallyType = {
  downloadedParcels: CreateParcelOrder[];
  currentParcel: CreateParcelOrder;
  date: string;
  chooseReason: string;
  chooseOffice: string;
  chooseNotifiedPlace: string;
};

export type otherResultStatusType = {
  parcel: CreateParcelOrder;
  chooseResult: string;
  chooseDetails: string;
  input: string | number;
  date: string;
};

export type otherStatusLocallyType = {
  downloadedParcels: CreateParcelOrder[];
  currentParcel: CreateParcelOrder;
  input: string;
  chooseResult: string;
  chooseDetails: string;
  date: string;
};

export type deliveryWithCodeType = {
  id: string | undefined;
  date: string;
  numberOfBook: string | undefined;
  username: string;
};
export type deliveryWithCodeLocallyType = {
  downloadedParcels: CreateParcelOrder[];
  updatedParcel: CreateParcelOrder;
  date: string;
};

export type multiDeliveryLocallyType = {
  downloadedParcels: CreateParcelOrder[];
  date: string;
  chooseSubject: string;
  details: string;
  noAddressee: boolean | undefined;
  input: string | number;
};

export type multiDeliverStatusType = {
nameOfStatus?: string;
  createdAt?: string;
  signature?: string;
  noAddressee?: boolean;
  deliveryInput?: string;
  user?: string;
  subject?: string;
  details?: string;
};

export type clearSignatureByButtonType = {
  downloadedParcels: CreateParcelOrder[];
  updateParcels: CreateParcelOrder[];
};

export type multiAdvicedStatusType = {
  createdAt: string;
  reasonOfAdvice: string;
  placeOfAdvice: string;
  placeOfNotification: string;
  user: string;
};

type multiAdvicedStatusLocallyType = {
  downloadedParcels: CreateParcelOrder[];
  createdAt: string;
  reasonOfAdvice: string;
  officeOfAdvice: string;
  placeOfNotification: string;
};

export type multiResultsType = {
  date: string;
  chooseResult: string;
  chooseDetails: string;
  input: string | number;
  user: string;
};

export type multiResultsLocallyType = {
  downloadedParcels: CreateParcelOrder[];
  createdAt: string;
  chooseResult: string;
  chooseDetails: string;
  input: string | number;
};

export const deliveryStatusWithAddressee = ({
  parcel,
  chooseSubject,
  savePoints,
  input,
  date,
}: deliveryStatusType): any => {
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

export const deliveryStatusWithNoAddressee = ({
  parcel,
  chooseSubject,
  particularSubject,
  savePoints,
  input,
  date,
}: deliveryStatusType): any => {
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

export const deliveryStatusLocally = ({
  downloadedParcels,
  updatedParcel,
  date,
  chooseSubject,
  particularSubject,
  input,
  noAddressee,
}: deliveryStatusLocallyType): any => {
  return downloadedParcels.map((parcel) => {
    if (updatedParcel._id === parcel._id) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...(Array.isArray(parcel.status) ? parcel.status : []),
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

export const deliveryStatusNoAddresseeLocally = ({
  downloadedParcels,
  updatedParcel,
  date,
  chooseSubject,
  particularSubject,
  input,
}: deliveryStatusLocallyType) => {
  return downloadedParcels.map((parcel) => {
    if (updatedParcel._id === parcel._id) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...(Array.isArray(parcel.status) ? parcel.status : []),
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

export const advicedStatusObject = ({
  parcel,
  chooseReason,
  chooseOffice,
  chooseNotifiedPlace,
  date,
}: advicedStatusObjectType): any => {
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

export const advicedStatusLocally = ({
  downloadedParcels,
  currentParcel,
  date,
  chooseReason,
  chooseOffice,
  chooseNotifiedPlace,
}: advicedStatusLocallyType) => {
  return downloadedParcels.map((parcel) => {
    if (parcel._id === currentParcel._id) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...(Array.isArray(parcel.status) ? parcel.status : []),
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

export const otherResultStatus = ({
  parcel,
  chooseResult,
  chooseDetails,
  input,
  date,
}: otherResultStatusType): any => {
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

export const otherStatusLocally = ({
  downloadedParcels,
  currentParcel,
  input,
  chooseResult,
  chooseDetails,
  date,
}: otherStatusLocallyType) => {
  return downloadedParcels.map((parcel) => {
    if (parcel._id === currentParcel._id) {
      return {
        ...parcel,
        status: [
          ...(Array.isArray(parcel.status) ? parcel.status : []),
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

export const deliveryWithCode = ({
  id,
  date,
  numberOfBook,
  username,
}: deliveryWithCodeType): any => {
  return {
    nameOfStatus: "DELIVERED",
    id,
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
    numberOfBook,
    username,
    isDownloaded: true,
    createdAt: date,
  };
};


export const deliveryWithCodeLocally = ({
  downloadedParcels,
  updatedParcel,
  date,
}: deliveryWithCodeLocallyType) => {
  return downloadedParcels.map((parcel) => {
    if (updatedParcel._id === parcel._id) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...(Array.isArray(parcel.status) ? parcel.status : []),
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

export const deliverWithCodeQueryClient = (date: string) => {
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

export const setNoAddresseLocally = (
  downloadedParcels: CreateParcelOrder[],
  updatedParcel: CreateParcelOrder,
) => {
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

export const multiDeliveryLocally = ({
  downloadedParcels,
  date,
  chooseSubject,
  details,
  noAddressee,
  input,
}: multiDeliveryLocallyType): any => {
  return downloadedParcels.map((parcel) => {
    if (parcel.isMarked) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...(Array.isArray(parcel.status) ? parcel.status : []),
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

export const multiDeliverStatus = ({
  createdAt,
  signature,
  noAddressee,
  deliveryInput,
  user,
  subject,
  details,
}: multiDeliverStatusType) => {
  return {
    nameOfStatus: "DELIVERED",
    createdAt,
    signature,
    noAddressee,
    deliveryInput,
    user,
    subject,
    details,
  };
};

export const clearSignatureByButton = ({
  downloadedParcels,
  updateParcels,
}: clearSignatureByButtonType) => {
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

export const multiAdvicedStatus = ({
  createdAt,
  reasonOfAdvice,
  placeOfAdvice,
  placeOfNotification,
  user,
}: multiAdvicedStatusType): any => {
  return {
    createdAt,
    reasonOfAdvice,
    officeOfAdvice: placeOfAdvice,
    placeOfNotification,
    user,
  };
};

export const multiAdvicedStatusLocally = ({
  downloadedParcels,
  createdAt,
  reasonOfAdvice,
  officeOfAdvice,
  placeOfNotification,
}: multiAdvicedStatusLocallyType): any => {
  return downloadedParcels.map((parcel) => {
    if (parcel.isMarked) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...(Array.isArray(parcel.status) ? parcel.status : []),
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

export const multiResults = ({
  date,
  chooseResult,
  chooseDetails,
  input,
  user,
}: multiResultsType): any => {
  return {
    createdAt: date,
    subject: chooseResult,
    details: chooseDetails,
    input,
    user,
  };
};

export const multiResultsLocally = ({
  downloadedParcels,
  createdAt,
  chooseResult,
  chooseDetails,
  input,
}: multiResultsLocallyType): any => {
  return downloadedParcels.map((parcel) => {
    if (parcel.isMarked) {
      return {
        ...parcel,
        isMarked: false,
        status: [
          ...(Array.isArray(parcel.status) ? parcel.status : []),
          {
            name: "OTHER",
            createdAt,
            result: chooseResult,
            details: chooseDetails,
            signature: null,
            isDeliveryCode: false,
            isMarked: false,
          },
        ],
      };
    }

    return parcel;
  });
};
