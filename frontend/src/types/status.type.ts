

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