

export type StatusType = {
    name: string;
    createdAt: String;
    subject?: string;
    details?: string;
    isSignature?: boolean;
    signature?: string;
    deliveryInput?: string | null;
    noAddressee?: boolean;
    reasonOfAdvice?: string;
    officeOfAdvice?: string;
    placeOfNotification?: string;
    _id: string;
  };

  export type inDeliveryStatusType = {
    numberOfBook: any;
            username: string;
            createdAt: string;
  }

  export type failedDeliveryCodeType = {
    id: string | undefined;
    amountOfTrials: number;
  }

  export type loginUserType = {
    username: string;
    password: string;
  }

  export type markAllParcelOnFalseOrTrueInListType = {
    user: string;
  }

  export type markParcelType = {
    markParcel: boolean;
    id: string | undefined;
  }

  export type assignParcelsToUserType = {
    numberOfBook: string;
    username: string;
  }

  export type deleteBookType = {
    numberOfBook: string;
  }