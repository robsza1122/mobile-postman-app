import React, { createContext, useEffect, useState } from "react";
import { useLocaleStorage } from "./hooks/useLocaleStorage";
import { useRef } from "react";
import useAuth from "./hooks/useAuth";
import { deleteAllDates } from "./api/api";
import showCurrentUsers from "./hooks/showAllUsers";
import { CreateParcelOrder } from "./types/parcel.type";

type PostManStateType = {
  isLoggedOut: boolean;
  setIsLoggedOut: (value: boolean) => void;
  isMainPage: boolean;
  setIsMainPage: (value: boolean) => void;
  slideOptions: number;
  setSlideOptions: (value: number) => void;
  chosenOption: number;
  setChosenOption: (value: number) => void;
  currentUser: any;
  setCurrentUser: (value: any) => void;
  checkedParcel: any;
  setCheckedParcel: (value: any) => void;
  deliveryCode: string;
  setDeliveryCode: (value: string) => void;
  chooseSubject: string;
  setChooseSubject: (value: string) => void;
  clearBook: () => void;
  savePoints: any;
  setSavePoints: (value: any) => void;
  clearSignature: () => void;
  input: string;
  setInput: (value: string) => void;
  handleSignatureButton: () => void;
  handleSignatureLink: () => string | undefined;
  signatureRef: any;
  particularSubject: string;
  setParticularSubject: (value: string) => void;
  settled: boolean;
  setSettled: (value: boolean) => void;
  deliveryBooks: any[];
  setDeliveryBooks: (value: any[]) => void;
  listOfPositions: any[];
  setListOfPositions: (value: any[]) => void;
  showAllCurrentUsers: any[];
  setShowAllCurrentUsers: (value: any[]) => void;
  dayIsFinished: boolean;
  setDayIsFinished: (value: boolean) => void;
  downloadedParcels: CreateParcelOrder[];
  setDownloadedParcels: (value: CreateParcelOrder[]) => void;
  isUpdatingParcel: boolean;
  setIsUpdatingParcel: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  isMultiStatus: boolean;
  setIsMultiStatus: (value: boolean) => void;
  placeOfLeavingParcels: string;
  setPlaceOfLeavingParcels: (value: string) => void;
};

export const PostManState = createContext({
  isLoggedOut: true,
  setIsLoggedOut: () => {},
  isMainPage: true,
  setIsMainPage: () => {},
  slideOptions: 0,
  setSlideOptions: () => {},
  chosenOption: 1,
  setChosenOption: () => {},
  currentUser: {},
  setCurrentUser: () => {},
  checkedParcel: {},
  setCheckedParcel: () => {},
  deliveryCode: "",
  setDeliveryCode: () => {},
  chooseSubject: "Addressee",
  setChooseSubject: () => {},
  clearBook: () => {},
  savePoints: [],
  setSavePoints: () => {},
  clearSignature: () => {},
  input: "",
  setInput: () => {},
  handleSignatureButton: () => {},
  handleSignatureLink: () => {},
  signatureRef: {},
  particularSubject: "Addressee refused doing readable signature",
  setParticularSubject: () => {},
  settled: false,
  setSettled: () => {},
  deliveryBooks: [],
  setDeliveryBooks: () => {},
  listOfPositions: [],
  setListOfPositions: () => {},
  showAllCurrentUsers: [],
  setShowAllCurrentUsers: () => {},
  dayIsFinished: false,
  setDayIsFinished: () => {},
  downloadedParcels: [],
  setDownloadedParcels: () => {},
  isUpdatingParcel: false,
  setIsUpdatingParcel: () => {},
  loading: false,
  setLoading: () => {},
  isMultiStatus: false,
  setIsMultiStatus: () => {},
  placeOfLeavingParcels: "",
  setPlaceOfLeavingParcels: () => {},
} as PostManStateType);

export const PostGlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { showUsers } = showCurrentUsers();
  const [isLoggedOut, setIsLoggedOut] = useLocaleStorage("isLoggedOut", true);
  const [isMainPage, setIsMainPage] = useLocaleStorage("isMainPage", true);
  const [downloadedParcels, setDownloadedParcels] = useLocaleStorage(
    "downloadedParcels",
    [],
  );
  const [slideOptions, setSlideOptions] = useLocaleStorage("slideOptions", 0);
  const [chosenOption, setChosenOption] = useLocaleStorage("chosenOption", 1);
  const [currentUser, setCurrentUser] = useLocaleStorage("currentUser", {});
  const [deliveryCode, setDeliveryCode] = useLocaleStorage("deliveryCode", "");
  const [savePoints, setSavePoints] = useLocaleStorage("savePoints", null);
  const [deliveryBooks, setDeliveryBooks] = useLocaleStorage(
    "deliveryBooks",
    [],
  );
  const [chooseSubject, setChooseSubject] = useLocaleStorage(
    "chooseSubject",
    "Addressee",
  );
  const [input, setInput] = useLocaleStorage("input", "");
  const [particularSubject, setParticularSubject] = useLocaleStorage(
    "particularSubject",
    "Addressee refused doing readable signature",
  );
  const [settled, setSettled] = useState<boolean>(false);
  const [listOfPositions, setListOfPositions] = useLocaleStorage(
    "listOfPositions",
    [],
  );
  const [dayIsFinished, setDayIsFinished] = useLocaleStorage(
    "dayIsFinished",
    false,
  );
  const [showAllCurrentUsers, setShowAllCurrentUsers] = useLocaleStorage(
    "showAllCurrentUsers",
    [],
  );
  const [isUpdatingParcel, setIsUpdatingParcel] = useState(false);
  const [checkedParcel, setCheckedParcel] = useLocaleStorage("checkedParcel", {});
  const [loading, setLoading] = useState<boolean>(false);
  const [isMultiStatus, setIsMultiStatus] = useState<boolean>(false);
  const [placeOfLeavingParcels, setPlaceOfLeavingParcels] = useState<string>("");

  const signatureRef = useRef<any>(null);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user, setCurrentUser]);

  useEffect(() => {
    if (showUsers) {
      setShowAllCurrentUsers(showUsers);
    }
  }, []);

  const clearBook = () => {
    localStorage.clear();
    deleteAllDates();
    setDeliveryBooks([]);
    setSettled(false);
    setDownloadedParcels([]);
  };

  const clearSignature = () => {
    setSavePoints([]);
    signatureRef.current?.clear();
  };

  const handleSignatureButton = () => {
    if (
      input === "" &&
      particularSubject === "Parcel left in place set with addressee"
    ) {
      alert("Type name and surname delivery's subject");

      return;
    }
    if (savePoints) {
      setSavePoints(null);

      return;
    }
  };

  const handleSignatureLink = () => {
    if (
      input === "" &&
      particularSubject === "Parcel left in place set with addressee"
    ) {
      return;
    }

    if (savePoints) {
      return;
    }

    if (!savePoints) {
      return "/signatureScreen";
    }
  };

  return (
    <PostManState.Provider
      value={{
        isLoggedOut,
        setIsLoggedOut,
        isMainPage,
        setIsMainPage,
        slideOptions,
        chosenOption,
        setChosenOption,
        setSlideOptions,
        currentUser,
        setCurrentUser,
        checkedParcel,
        setCheckedParcel,
        deliveryCode,
        setDeliveryCode,
        setSavePoints,
        savePoints,
        chooseSubject,
        setChooseSubject,
        input,
        setInput,
        particularSubject,
        setParticularSubject,
        listOfPositions,
        setListOfPositions,
        showAllCurrentUsers,
        setShowAllCurrentUsers,
        dayIsFinished,
        setDayIsFinished,
        deliveryBooks,
        setDeliveryBooks,
        setSettled,
        settled,
        clearBook,
        clearSignature,
        handleSignatureButton,
        handleSignatureLink,
        signatureRef,
        downloadedParcels,
        setDownloadedParcels,
        isUpdatingParcel,
        setIsUpdatingParcel,
        loading,
        setLoading,
        isMultiStatus,
        setIsMultiStatus,
        placeOfLeavingParcels,
        setPlaceOfLeavingParcels,
      }}
    >
      {children}
    </PostManState.Provider>
  );
};
