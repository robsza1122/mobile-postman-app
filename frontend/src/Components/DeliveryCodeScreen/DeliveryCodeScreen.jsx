import { useContext, useEffect } from "react";
import "./DeliveryCodeScreen.scss";
import PinInput from "react-pin-input";
import { PostManState } from "../../PostGlobalProvider";
import { useNavigate } from "react-router-dom";
import useParcels from '../../hooks/useParcels'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDeliveredStatus } from "../../api/api";
import { date } from "../../utils/currentDate";

export const DeliveryCodeScreen = () => {
  const navigate = useNavigate();
  const {
    currentParcels,
    setDownloadedBook,
    downloadedBook,
    setDeliveryCode,
    currentUser,
    deliveryCode,
  } = useContext(PostManState);
  const {parcels} = useParcels();
  const queryClient = useQueryClient();
    const { mutate: changeStatus } = useMutation({
      mutationFn: addDeliveredStatus,
      mutationKey: ["parcels"],
      onSuccess: () => {
        window.location.reload();
      },
    });
  useEffect(() => {
    window.onpopstate = () => {
      navigate("/ML")
      setDownloadedBook(
        downloadedBook.map((parcel) => {
          if (parcel.isMarked) {
            return {
              ...parcel,
              isMarked: false,
            };
          }

          return parcel;
        })
      );
    };
  }, []);

    const onDeliveryCode = (clickedParcel) => {
      setDownloadedBook(
        downloadedBook.map((parcel) => {
          console.log(parcel.amountOfTrials);
          if (
            clickedParcel[0]._id === parcel._id &&
            deliveryCode !== clickedParcel[0].deliveryCode &&
            deliveryCode !== "" &&
            deliveryCode.length === 6
          ) {
            switch (parcel.amountOfTrials) {
              case 0:
                setDeliveryCode("");
                alert("Wrong delivery code");
                return {
                  ...parcel,
                  amountOfTrials: 1,
                };
              case 1:
                setDeliveryCode("");
                alert("Wrong delivery code");
                return {
                  ...parcel,
                  amountOfTrials: 2,
                };
              case 2:
                setDeliveryCode("");
                alert("Wrong delivery code");
                alert("DELIVERY CODE IS BLOCKED");
                navigate("/traditionalDeliver");
                return {
                  ...parcel,
                  amountOfTrials: 3,
                };
            }
          }
  
          if (deliveryCode === parcel.deliveryCode) {
            navigate("/deliverOption");
            changeStatus({
              nameOfStatus: "DELIVERED",
              id: parcel._id,
              subject: "",
              details: "",
              signature: null,
              isDeliveryCode: true,
              isSignature: false,
              noAddressee: false,
              deliveryInput: "",
              reasonOfAdvice: "",
              officeOfAdvice: "",
              placeOfNotification: "",
              isBooked: true,
              numberOfBook: parcel.numberOfBook,
              isDownloaded: true,
              username: parcel.forUser,
              createdAt: date,
  
            });
            return {
              ...parcel,
              isMarked: false,
              isDeliveryCode: true,
              status: [
                ...parcel.status,
                {
                  name: "DELIVERED",
                  createdAt: date,
                },
              ],
            };
          }
          return parcel;
        })
      );
  
      if (deliveryCode === "") {
        setDeliveryCode("");
        alert("No delivery code is typed");
  
        return;
      }
  
      if (deliveryCode.length !== 6) {
        setDeliveryCode("");
        alert("Delivery code has 6 characters");
  
        return;
      }
    };

  console.log(currentParcels);
  console.log(downloadedBook);
  console.log(parcels);

  const codeTrials = downloadedBook.find(parcel => parcel._id === currentParcels[0]._id);

  return (
    <div className="dsc__content">
      <nav className="dsc__nav">
        <p className="dsc__text">Type Delivery Code</p>
        <p className="dsc__user">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
      </nav>
      <div className="dsc__body">
        <p className="dsc__number">
          {currentParcels[0].numberOfParcel}
        </p>
        <p className="dsc__deliverytext">TYPE DELIVERY CODE</p>
        <p className="dsc__cashondelivery">Cash on delivery {!currentParcels[0].amount.toString().includes(".") ? `${currentParcels[0].amount}.00` : currentParcels[0].amount}</p>
          <p className="dsc__trials">Amount of trials {codeTrials.amountOfTrials} / 3</p>
        <PinInput
          className="dsc__pinsquare"
          style={{
            alignSelf: "center",
            margin: "50px auto",
          }}
          onChange={(e) => setDeliveryCode(e)}
          length={6}
          initialValue=""
          type="numeric"
          focus
        />
        <div className="dsc__buttons">
          <button
           className="dsc__button"
           onClick={() => navigate("/traditionalDeliver")}>Deliver traditionally</button>
          <button
            className="dsc__button"
            onClick={() => onDeliveryCode(currentParcels)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
