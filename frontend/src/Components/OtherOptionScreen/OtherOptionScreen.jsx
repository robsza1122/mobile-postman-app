import "../AdvicingScreen/AdvicingScreen.scss";
import { useContext, useState } from "react";
import { PostManState } from "../../PostGlobalProvider";
import {
  placeOfAdvice,
  placeOfNotification,
  reasonOfAdvice,
  resultOfDelivery,
} from "../../utils/DataProvider";
import { date } from "../../utils/currentDate";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addOtherResult } from "../../api/api";

export const OtherOptionScreen = () => {
  const { currentUser, setInput, input } = useContext(PostManState);
  const { setDownloadedBook, downloadedBook, currentParcels } =
    useContext(PostManState);
  const { mutate: otherResult } = useMutation({
    mutationKey: ["advicedParcel"],
    mutationFn: addOtherResult,
  });
  const [chooseResult, setChooseResult] = useState("Parcel postponed");
  const [showResult, setShowResult] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [chooseDetails, setChooseDetails] = useState(
    "Addressee ordered delivery again"
  );
  const navigate = useNavigate();

  const onResult = () => {
    setShowResult(!showResult);
  };

  const onDetails = () => {
    setShowDetails(!showDetails);
  };
  const onChooseDetails = (Details) => {
    setChooseDetails(Details);
    setShowDetails(false);
  };

  const onChooseResult = (result) => {
    setChooseResult(result);
    setShowResult(false);
  };

  const handleConfirmButton = () => {
    setDownloadedBook(
      downloadedBook.map((parcel) => {
        if (parcel._id === currentParcels[0]._id) {
          otherResult({
            id: currentParcels[0]._id,
            subject: chooseResult,
            details: chooseDetails,
            nameOfStatus: "OTHER",
            signature: null,
            isDeliveryCode: false,
            isSignature: false,
            noAddressee: false,
            deliveryInput: input,
            reasonOfAdvice: "",
            DetailsOfAdvice: "",
            placeOfNotification: "",
          });
          return {
            ...parcel,
            status: [
              ...parcel.status,
              {
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
      })
    );

    if (chooseDetails === "Parcel returned from other reason" && input === "") {
      alert("No other reason is typed");
      return;
    }

    if (chooseDetails === "Parcel lost" && input === "") {
      alert("No reason is typed");
      return;
    }
    if (chooseDetails === "Parcel left in shop, ORLEN, ParcelPoint" && input === "") {
      alert("No name and surname is typed");
      return;
    }
    navigate("/otherOption");
  };

  const handleChoosingOptions = (options) => {
    switch (options) {
      case "Parcel postponed":
        return [
          "Addressee ordered delivery again",
          "Courier was not on time",
          "No one was at home",
        ];
      case "Lack of status":
        return ["Parcel lost"];
      case "Wrong address":
        return [
          "Parcel wrongly directed",
          "Parcel should be written to other courier",
        ];
      case "Delivered to ZDO":
        return [
          "Parcel delivered to boxmachine",
          "Parcel left in shop, ORLEN, ParcelPoint",
        ];
      case "Parcel undelivered to ZDO":
        return [
          "Parcel directed to post office",
          "Parcel wrongly directed",
          "Parcel undelivered from other reason",
        ];
      case "Parcel directed to office of undeliverable parcels":
        return ["Parcels adviced on post office from other reason"];
      case "Parcel returned to sender":
        return [
          "Addressee refused delivery",
          "Parcel is damaged",
          "Addressee moved out",
          "Addressee passed on",
          "Parcel returned from other reason",
          "Wrong address",
          "Parcel is impossible to delivery",
        ];
    }
  };

  console.log(chooseResult);
  console.log(chooseDetails);

  return (
    <>
      {showResult && (
        <>
          <div className="advice__background"></div>
          <div className="advice__window">
            {resultOfDelivery.map((result) => (
              <>
                <button
                  className="advice__button"
                  onClick={() => {
                    onChooseResult(result);
                    onChooseDetails(handleChoosingOptions(result)[0]);
                  }}
                >
                  {result}
                </button>
              </>
            ))}
          </div>
        </>
      )}
      {showDetails && (
        <>
          <div className="advice__background"></div>
          <div className="advice__window">
            {handleChoosingOptions(chooseResult).map((reason) => {
              console.log(reason);
              return (
                <>
                  <button
                    className="advice__button"
                    onClick={() => onChooseDetails(reason)}
                  >
                    {reason}
                  </button>
                </>
              );
            })}
          </div>
        </>
      )}

      <div className="advice">
        <nav className="advice__nav">
          <p className="advice__info">OTHER OPTIONS</p>
          <p className="advice__user">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
        </nav>
        <div
          className="deliver__positioncontent"
          style={{
            borderBottom: "1px solid gray",
          }}
        >
          <p className="deliver__number" style={{ marginLeft: "60px" }}>
            {currentParcels[0].numberOfParcel}
          </p>
          <p
            className="deliver__info"
            style={{ marginLeft: "60px" }}
          >{`${currentParcels[0].name} ${currentParcels[0].surname}`}</p>
          <p className="deliver__info" style={{ marginLeft: "60px" }}>
            {currentParcels[0].adress}
          </p>
          <p
            className="deliver__adress"
            style={{ marginLeft: "60px" }}
          >{`${currentParcels[0].city} ${currentParcels[0].postCode}`}</p>
        </div>
        <div className="advice__content">
          <p className="advice__text">Result of Delivery:</p>
          <button className="advice__selecttext" onClick={() => onResult()}>
            {chooseResult}
          </button>
          <p className="advice__text">Details of delivery:</p>
          <button className="advice__selecttext" onClick={() => onDetails()}>
            {chooseDetails}
          </button>
          {chooseDetails === "Parcel returned from other reason" && (
            <>
              <p className="advice__reason">Other reason:</p>
              <input
                type="text"
                className="advice__input"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Type other reason..."
              />
            </>
          )}

          {chooseDetails === "Parcel lost" && (
            <>
              <p className="advice__reason">Reason:</p>
              <input
                type="text"
                className="advice__input"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Type reason..."
              />
            </>
          )}
          {chooseDetails === "Parcel left in shop, ORLEN, ParcelPoint" && (
            <>
              <p className="advice__reason">Name and surname receiving person:</p>
              <input
                type="text"
                className="advice__input"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Type name and surname..."
              />
            </>
          )}
        </div>
        <div className="advice__confirmcontent">
          <button
            className="advice__confirmbutton"
            onClick={() => handleConfirmButton()}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};
