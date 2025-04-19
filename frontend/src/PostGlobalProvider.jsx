import React, { createContext, useEffect, useMemo, useState } from "react";
import { useLocaleStorage } from "./hooks/useLocaleStorage";
import { date } from "./utils/currentDate";
import { useAsyncError, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuth from "./hooks/useAuth";
import { addDeliveredStatus } from "./api/api";


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
    deliveryCode: '',
    setDeliveryCode: () => {},
    chooseSubject: "Addressee",
    setChooseSubject: () => {},
    clearBook: () => {},
    onDeliveryCode: () => {},
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
}
);


export const PostGlobalProvider = ({children}) => {
    const [downloadedBook, setDownloadedBook] = useLocaleStorage('downloadedBook', []);
    const [slideOptions, setSlideOptions] = useLocaleStorage('slideOptions', 0);
    const [chosenOption, setChosenOption] = useLocaleStorage('chosenOption', 1);
    const [currentUser, setCurrentUser] = useLocaleStorage('currentUser', {});
    const [currentParcels, setCurrentParcels] = useLocaleStorage("currentParcels", []);
    const [checkedParcel, setCheckedParcel] = useLocaleStorage("checkedParcel", {});
    const [deliveryCode, setDeliveryCode] = useLocaleStorage("deliveryCode", "");
    const [savePoints, setSavePoints] = useLocaleStorage("savePoints", null);
    const [chooseSubject, setChooseSubject] = useLocaleStorage("chooseSubject", "Addressee");
    const [input, setInput] = useLocaleStorage("input", "");
    const [particularSubject, setParticularSubject] = useLocaleStorage("particularSubject", "Addressee refused doing readable signature");
    const [settled, setSettled] = useState(false);

    const navigate = useNavigate();
    const signatureRef = useRef({});

    const {mutate: changeStatus} = useMutation({
      mutationKey: ['changeStatus'],
      mutationFn: addDeliveredStatus,
    })

    const {user} = useAuth();

    useEffect(() => {
      if (user) {
      setCurrentUser(user);
      }
    }, []);
 
      const onDeliveryCode = (clickedParcel) => {

        setDownloadedBook(downloadedBook.map(parcel => {
          console.log(parcel.amountOfTrials)
          if (clickedParcel[0]._id === parcel._id &&
             deliveryCode !== clickedParcel[0].deliveryCode && 
             deliveryCode !== '' &&
            deliveryCode.length === 6) {
            switch(parcel.amountOfTrials) {
              case 0:
                setDeliveryCode('');
                alert("Wrong delivery code");
                return {
                  ...parcel,
                  amountOfTrials: 1,
                }
              case 1:
                setDeliveryCode('');
                alert("Wrong delivery code");
                return {
                  ...parcel,
                  amountOfTrials: 2,
                }
              case 2:
                setDeliveryCode('');
                alert("Wrong delivery code");
                alert("DELIVERY CODE IS BLOCKED");
                navigate("/traditionalDeliver");
                return {
                  ...parcel,
                  amountOfTrials: 3,
                }
          }
        }
        
          if (deliveryCode === parcel.deliveryCode) { 
        navigate("/deliverOption");
        changeStatus({
          nameOfStatus: "DELIVERED",
          id: parcel._id,
          signature: null,
          isSignature: false,
          isDeliveryCode: true,
          noAddressee: false,
          deliveryInput: '',
          reasonOfAdvice: '', 
          officeOfAdvice: '',
          placeOfNotification: '',
          subject: '',
          details: '',
        })
          return {
            ...parcel,
            isMarked: false,
            isDeliveryCode: true,
            status: [
              ...parcel.status,
              {
                name: "DELIVERED",
                createdAt: date,
              }
            ]
          }
        }
        return parcel;
        }));

        if (deliveryCode === '') {
          setDeliveryCode('');
          alert("No delivery code is typed");

          return;
        }

        if (deliveryCode.length !== 6) {
          setDeliveryCode('')
          alert("Delivery code has 6 characters");

          return;
        }   
      }


     const clearBook = () => {
      setDownloadedBook([]);
              localStorage.clear();
              setSettled(false);
              };

              const clearSignature = () => {
                setSavePoints([]);
                signatureRef.current?.clear();
              }

              const saveSignature = () => {
                setDownloadedBook(downloadedBook.map(parcel => {
                  if (currentParcels[0]._id === parcel._id) {
                    return {
                      ...parcel,
                      isSignature: true,
                      signature: savePoints,
                    }
                  }

                  return parcel;
                }));
                navigate("/traditionalDeliver");
                
              };

              const handleSignatureButton = () => {
                setSavePoints([]);

                if (input === "") {
                  alert("Type name and surname delivery's subject");

                  return;
                }

                setDownloadedBook(downloadedBook.map(parcel => {
                  if (currentParcels[0]._id === parcel._id) {
                    return {
                      ...parcel,
                      isSignature: false,
                      signature: null,
                    }
                  }
            
                  return parcel;
                }))
              }

    return (
        <PostManState.Provider value={{
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
            setSettled,
            settled,
            onDeliveryCode,
            clearBook,
            saveSignature,
            clearSignature,
            handleSignatureButton,
            signatureRef,
        }}>
        {children}
        </PostManState.Provider>
    )
}