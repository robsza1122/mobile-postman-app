import React, { createContext, useEffect, useState } from "react";
import { useLocaleStorage } from "./hooks/useLocaleStorage";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import useAuth from "./hooks/useAuth";
import { deleteAllDates } from "./api/api";
import showCurrentUsers from "./hooks/showAllUsers";

export const PostManState = createContext({
  slideOptions: 0,
  setSlideOptions: () => {},
  chosenOption: 1,
  setChosenOption: () => {},
  downloadedBook: [],
  setDownloadedBook: () => {},
  currentUser: {},
  setCurrentUser: () => {},
  currentParcels: [],
  setCurrentParcels: () => {},
  checkedParcel: {},
  setCheckedParcel: () => {},
  deliveryCode: "",
  setDeliveryCode: () => {},
  chooseSubject: "Addressee",
  setChooseSubject: () => {},
  clearBook: () => {},
  savePoints: [],
  setSavePoints: () => {},
  saveSignature: () => {},
  clearSignature: () => {},
  input: "",
  setInput: () => {},
  handleSignatureButton: () => {},
  signatureRef: {},
  particularSubject: "Addressee refused doing readable signature",
  setParticularSubject: () => {},
  settled: false,
  setSettled: () => {},
  listOfPositions: [],
  setListOfPositions: () => {},
  deliveryBooks: [],
  setDeliveryBooks: () => {},
  parcelsInDatabase: [],
  setParcelsInDatabase: () => {},
  showAllCurrentUsers: [],
  setShowAllCurrentUsers: () => {},
  dayIsFinished: false,
  setDayIsFinished: () => {},
});

export const PostGlobalProvider = ({ children }) => {
  const { user } = useAuth();
  const { showUsers } = showCurrentUsers();
  const [downloadedBook, setDownloadedBook] = useLocaleStorage(
    "downloadedBook",
    []
  );
  const [slideOptions, setSlideOptions] = useLocaleStorage("slideOptions", 0);
  const [chosenOption, setChosenOption] = useLocaleStorage("chosenOption", 1);
  const [currentUser, setCurrentUser] = useLocaleStorage("currentUser", {});
  const [currentParcels, setCurrentParcels] = useLocaleStorage(
    "currentParcels",
    []
  );
  const [checkedParcel, setCheckedParcel] = useLocaleStorage(
    "checkedParcel",
    {}
  );
  const [deliveryCode, setDeliveryCode] = useLocaleStorage("deliveryCode", "");
  const [savePoints, setSavePoints] = useLocaleStorage("savePoints", null);
  const [chooseSubject, setChooseSubject] = useLocaleStorage(
    "chooseSubject",
    "Addressee"
  );
  const [input, setInput] = useLocaleStorage("input", "");
  const [particularSubject, setParticularSubject] = useLocaleStorage(
    "particularSubject",
    "Addressee refused doing readable signature"
  );
  const [settled, setSettled] = useState(false);
  const [listOfPositions, setListOfPositions] = useLocaleStorage(
    "listOfPositions",
    []
  );
  const [deliveryBooks, setDeliveryBooks] = useLocaleStorage(
    "deliveryBooks",
    []
  );
  const [parcelsInDatabase, setParcelsInDatabase] = useLocaleStorage(
    "parcelsInDatabase",
    []
  );
  const [dayIsFinished, setDayIsFinished] = useLocaleStorage(
    "dayIsFinished",
    false
  );
  const [showAllCurrentUsers, setShowAllCurrentUsers] = useLocaleStorage(
    "showAllCurrentUsers",
    []
  );

  const navigate = useNavigate();
  const signatureRef = useRef({});

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
    setDownloadedBook([]);
    localStorage.clear();
    deleteAllDates();
    setSettled(false);
  };

  const clearSignature = () => {
    setSavePoints([]);
    signatureRef.current?.clear();
  };

  const saveSignature = () => {
    setDownloadedBook(
      downloadedBook.map((parcel) => {
        if (currentParcels[0]._id === parcel._id) {
          return {
            ...parcel,
            isSignature: true,
            signature: savePoints,
          };
        }

        return parcel;
      })
    );
    navigate("/traditionalDeliver");
  };

  const handleSignatureButton = () => {
    setSavePoints([]);

    if (
      input === "" && particularSubject === "Parcel left in place set with addressee"
      
    ) {
      alert("Type name and surname delivery's subject");

      return;
    }

    setDownloadedBook(
      downloadedBook.map((parcel) => {
        if (currentParcels[0]._id === parcel._id) {
          return {
            ...parcel,
            isSignature: false,
            signature: null,
          };
        }

        return parcel;
      })
    );
  };

  return (
    <PostManState.Provider
      value={{
        downloadedBook,
        setDownloadedBook,
        slideOptions,
        chosenOption,
        setChosenOption,
        setSlideOptions,
        currentUser,
        setCurrentUser,
        currentParcels,
        setCurrentParcels,
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
        deliveryBooks,
        setDeliveryBooks,
        parcelsInDatabase,
        setParcelsInDatabase,
        showAllCurrentUsers,
        setShowAllCurrentUsers,
        dayIsFinished,
        setDayIsFinished,
        setSettled,
        settled,
        clearBook,
        saveSignature,
        clearSignature,
        handleSignatureButton,
        signatureRef,
      }}
    >
      {children}
    </PostManState.Provider>
  );
};
