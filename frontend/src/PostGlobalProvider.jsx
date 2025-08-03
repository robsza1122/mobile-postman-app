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
  deliveryBooks: [],
  setDeliveryBooks: () => {},
  listOfPositions: [],
  setListOfPositions: () => {},
  showAllCurrentUsers: [],
  setShowAllCurrentUsers: () => {},
  dayIsFinished: false,
  setDayIsFinished: () => {},
});

export const PostGlobalProvider = ({ children }) => {
  const { user } = useAuth();
  const { showUsers } = showCurrentUsers();
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
  const [settled, setSettled] = useState(false);
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
    localStorage.clear();
    deleteAllDates();
    setDeliveryBooks([]);
    setSettled(false);
  };

  const clearSignature = () => {
    setSavePoints([]);
    signatureRef.current?.clear();
  };

  const saveSignature = () => {};

  const handleSignatureButton = () => {
    setSavePoints([]);

    if (
      input === "" &&
      particularSubject === "Parcel left in place set with addressee"
    ) {
      alert("Type name and surname delivery's subject");

      return;
    }
  };

  return (
    <PostManState.Provider
      value={{
        slideOptions,
        chosenOption,
        setChosenOption,
        setSlideOptions,
        currentUser,
        setCurrentUser,
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
