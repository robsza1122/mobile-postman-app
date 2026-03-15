import { APP_ORIGIN } from "../constants/env";
import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import { parcelModel } from "../Models/ParcelModel";
import SessionModel from "../Models/SessionModel";
import UserModel from "../Models/UserModel";
import {
  refreshUserAccessToken,
} from "../services/auth.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchErrors";
import {
  clearUserCookies,
  getAccessTokenOptions,
  getRefreshTokenOptions,
  setUserCookies,
} from "../utils/cookies";
import { getDeliveryEmailTemplate } from "../utils/emailTemplate";
import { getInDeliveryStatusEmail } from "../utils/InDeliveryEmail";
import { verifyToken } from "../utils/jwt";
import { sendEmail } from "../utils/sendEmail";
import { parcelSchima } from "../schimas/parcel.schimas";
import { statusSchima } from "../schimas/status.schima";
import { loginShema, registerSchima } from "../schimas/user.schima";
import { usersParcelSchima } from "../schimas/usersparcel.schima";
import {
  assignParcelSchima,
  deleteDeliveryBookSchima,
} from "../schimas/assignparcels.schima";
import { markParcelSchima } from "../schimas/markparcel.schima";
import { failedDeliveryCodeSchima } from "../schimas/failedDeliveryCodeSchima";
import { markAllParcelInListSchima } from "../schimas/markAllParcelInListSchima";
import { multiAdvicingSchima, multiDeliverySchima, multiResultsSchima } from "../schimas/multiStatus.schima";
import { createNewUser, createOrder, date, loginUser } from "../services/parcel.service";
import { multiAdvicing, multiDelivery, multiResults } from "../services/multiStatus.service";
import { addInDeliveryStatus, advicedStatus, deliveredStatus, leaveParcelOnPostBranch, otherStatus } from "../services/status.service";
import { assignParcels, failedDeliveryCode, markParcel } from "../services/check.service";
import { markParcelInVerification, removeParcelsInVerification } from "../services/verification.service";
import { deleteBook, markAllParcelOnFalseInList, markAllParcelOnTrueInList } from "../services/book.service";
import { leaveParcelOnPostBranchSchima } from "../schimas/leaveParcelOnPostBranchSchima";

export const orderedParcelHandler = catchErrors(async (req, res) => {
  const request = parcelSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { parcel } = await createOrder(request);
  const url = `${APP_ORIGIN}/checkStatus/${parcel._id}`;

  await sendEmail({
    ...getDeliveryEmailTemplate(parcel, url),
    to: parcel.clientEmail,
  });
  res.status(CREATED).json(parcel);
});

export const getParcelsHandler = catchErrors(async (req, res) => {
  const parcels = await parcelModel.find(
    {
      userId: req.userId,
    },
    {
      senderName: 1,
      senderSurname: 1,
      senderPostCode: 1,
      senderCity: 1,
      senderAdress: 1,
      senderCountry: 1,
      name: 1,
      surname: 1,
      city: 1,
      country: 1,
      adress: 1,
      postCode: 1,
      amount: 1,
      cashOnDelivery: 1,
      clientEmail: 1,
      phone: 1,
      numberOfParcel: 1,
      isMarked: 1,
      isMarkedVERIFICATION: 1,
      deliveryCode: 1,
      amountOfTrials: 1,
      isDownloaded: 1,
      isDeliveryCode: 1,
      placeOfLeavingParcel: 1,
      status: 1,
      isBooked: 1,
      numberOfBook: 1,
      forUser: 1,
    },
    {
      sort: { createdAt: -1 },
    }
  );

  return res
    .status(OK)
    .json(parcels.map((parcel) => ({ ...parcel.toObject() })));
});


export const checkStatusHandler = catchErrors(async (req, res) => {
  const checkedParcel = await parcelModel.findById(req.params.id);

  appAssert(checkedParcel, NOT_FOUND, "Parcel not found");

  return res.status(OK).json(checkedParcel);
});

export const addInDeliveryStatusHandler = catchErrors(async (req, res) => {
  const request = usersParcelSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { assignParcelsToUser } = await addInDeliveryStatus(request);

  return res.status(OK).json(assignParcelsToUser);
});

export const deliveredStatusHandler = catchErrors(async (req, res) => {
  const request = statusSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { updatedUser } = await deliveredStatus(request);

  return res.status(OK).json(updatedUser);
});

export const failedDeliveryCodeHandler = catchErrors(async (req, res) => {
  const request = failedDeliveryCodeSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { updatedParcel } = await failedDeliveryCode(request);

  return res.status(OK).json(updatedParcel);
});

export const advicedStatusHandler = catchErrors(async (req, res) => {
  const request = statusSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { updatedUser } = await advicedStatus(request);

  return res.status(OK).json(updatedUser);
});

export const otherResultHandler = catchErrors(async (req, res) => {
  const request = statusSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { updatedUser } = await otherStatus(request);

  return res.status(OK).json(updatedUser);
});

export const inDeliveryEmailHandler = catchErrors(async (req, res) => {
  const sendEmailById = await parcelModel.findById(req.params.id);
  appAssert(sendEmailById, NOT_FOUND, "Email not found");
  const url = `${APP_ORIGIN}/checkStatus/${req.params.id}`;

  await sendEmail({
    ...getInDeliveryStatusEmail(sendEmailById, url),
    to: sendEmailById.clientEmail,
  });
  appAssert(sendEmailById, NOT_FOUND, "Parcel not found");

  return res.status(OK).json({
    message: "Email was successfully sent",
  });
});

export const showUsersHandler = catchErrors(async (req, res) => {
  const users = await UserModel.find(
    {
      userId: req.userId,
    },
    {
      username: 1,
      password: 1,
      EMINumber: 1,
    },
    {
      sort: { createdAt: -1 },
    }
  );

  return res.status(OK).json(users.map((user) => ({ ...user.toObject() })));
});

export const assignParcelsHandler = catchErrors(async (req, res) => {
  const request = assignParcelSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { assignedParcels } = await assignParcels(request);

  return res.status(OK).json(assignedParcels);
});

export const markParcelHandler = catchErrors(async (req, res) => {
  const request = markParcelSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { markedParcel } = await markParcel(request);

  return res.status(OK).json(markedParcel);
});

export const markingOnTrueInBookHandler = catchErrors(async (req, res) => {
  await parcelModel.updateMany(
    { isBooked: false },
    {
      $set: { isMarked: true },
    }
  );
  const updateParcels = await parcelModel.find({});

  res.status(OK).json(updateParcels);
});

export const markingOnFalseInBookHandler = catchErrors(async (req, res) => {
  await parcelModel.updateMany(
    { isBooked: false },
    {
      $set: { isMarked: false },
    }
  );

  const updateParcels = await parcelModel.find({});

  res.status(OK).json(updateParcels);
});

export const markingOnFalseInListHandler = catchErrors(async (req, res) => {
  const request = markAllParcelInListSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { changedParcels } = await markAllParcelOnFalseInList(request);

  res.status(OK).json(changedParcels);
});

export const markingOnTrueInListHandler = catchErrors(async (req, res) => {
  const request = markAllParcelInListSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { changedParcels } = await markAllParcelOnTrueInList(request);

  res.status(OK).json(changedParcels);
});

export const markParcelInVerificationHandler = catchErrors(async (req, res) => {
  const request = markParcelSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { changedParcel } = await markParcelInVerification(request);

  res.status(OK).json(changedParcel);
});

export const removeParcelsInVerificationHandler = catchErrors(
  async (req, res) => {
    const request = markAllParcelInListSchima.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    const { updatedParcels } = await removeParcelsInVerification(request);

    res.status(OK).json(updatedParcels);
  }
);

export const deleteBookHandler = catchErrors(async (req, res) => {
  const request = deleteDeliveryBookSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { updatedParcels } = await deleteBook(request);

  return res.status(OK).json(updatedParcels);
});

export const clearDatesHandler = catchErrors(async (req, res) => {
  const orderStatus = {
    name: "ORDERED",
    createdAt: date,
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
    {},
    {
      $set: {
        status: orderStatus,
        isBooked: false,
        isDownloaded: false,
        forUser: "",
        numberOfBook: "",
        isMarked: false,
        amountOfTrials: 0,
        placeOfLeavingParcel: "",
      },
    }
  );

  await UserModel.updateMany(
    {},
    {
      $set: { parcels: [] },
    }
  );

  return res.status(OK).json({
    message: "Book is successfully cleared",
  });
});

export const multiDeliveryHandler = catchErrors(async (req, res) => {
  const request = multiDeliverySchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { changedParcels } = await multiDelivery(request);

  res.status(OK).json(changedParcels);
});

export const multiAdvicingHandler = catchErrors(async (req, res) => {
  const request = multiAdvicingSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { updatedParcels } = await multiAdvicing(request);

  res.status(OK).json(updatedParcels);
})

export const multiResultsHandler = catchErrors(async (req, res) => {
  const request = multiResultsSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { updatedParcels } = await multiResults(request);

  res.status(OK).json(updatedParcels);
})

export const leaveParcelOnPostBranchHandler = catchErrors(async (req, res) => {
  const request = leaveParcelOnPostBranchSchima.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { updatedParcels } = await leaveParcelOnPostBranch(request);

  res.status(OK).json(updatedParcels);

});
