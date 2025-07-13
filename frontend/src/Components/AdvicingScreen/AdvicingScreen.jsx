import "./AdvicingScreen.scss";
import { useContext, useState, useEffect } from "react";
import { PostManState } from "../../PostGlobalProvider";
import {
  placeOfAdvice,
  placeOfNotification,
  reasonOfAdvice,
} from "../../utils/DataProvider";
import { date } from "../../utils/currentDate";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addAdvicedStatus } from "../../api/api";

export const AdvicingScreen = () => {
  const { currentUser } = useContext(PostManState);
  const { setDownloadedBook, downloadedBook, currentParcels, setInput } =
    useContext(PostManState);
  const { mutate: changeStatus } = useMutation({
    mutationKey: ["advicedParcel"],
    mutationFn: addAdvicedStatus,
    onSuccess: () => {
      window.location.reload();
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = () => {
      navigate("/ML");
      setInput("");
      window.location.reload();
    };
  });
  const [chooseReason, setChooseReason] = useState(
    "No one at home / closed company",
  );
  const [showReason, setShowReason] = useState(false);
  const [showOffice, setShowOffice] = useState(false);
  const [showNotifiedPlace, setShowNotifiedPlace] = useState(false);
  const [chooseNotifiedPlace, setChooseNotifiedPlace] = useState(
    "Post box of addressee",
  );
  const [chooseOffice, setChooseOffice] = useState("Pocztowa 1 UP 1");

  const onReason = () => {
    setShowReason(!showReason);
  };

  const onChooseReason = (reason) => {
    setChooseReason(reason);
    setShowReason(false);
  };

  const onOffice = () => {
    setShowOffice(!showOffice);
  };
  const onChooseOffice = (office) => {
    setChooseOffice(office);
    setShowOffice(false);
  };

  const onPlaceNotification = () => {
    setShowNotifiedPlace(!showNotifiedPlace);
  };

  const onChooseNotificationPlace = (place) => {
    setChooseNotifiedPlace(place);
    setShowNotifiedPlace(false);
  };

  const handleConfirmButton = () => {
    setDownloadedBook(
      downloadedBook.map((parcel) => {
        if (parcel._id === currentParcels[0]._id) {
          changeStatus({
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
          });
          return {
            ...parcel,
            status: [
              ...parcel.status,
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
      }),
    );
    navigate("/advicedOption");
  };

  console.log(chooseNotifiedPlace);

  return (
    <>
      {showReason && (
        <>
          <div className="advice__background"></div>
          <div className="advice__window">
            {reasonOfAdvice.map((reason) => (
              <>
                <button
                  className="advice__button"
                  onClick={() => onChooseReason(reason)}
                >
                  {reason}
                </button>
              </>
            ))}
          </div>
        </>
      )}
      {showOffice && (
        <>
          <div className="advice__background"></div>
          <div className="advice__window">
            {placeOfAdvice.map((reason) => (
              <>
                <button
                  className="advice__button"
                  onClick={() => onChooseOffice(reason)}
                >
                  {reason}
                </button>
              </>
            ))}
          </div>
        </>
      )}
      {showNotifiedPlace && (
        <>
          <div className="advice__background"></div>
          <div className="advice__window">
            {placeOfNotification.map((reason) => (
              <>
                <button
                  className="advice__button"
                  onClick={() => onChooseNotificationPlace(reason)}
                >
                  {reason}
                </button>
              </>
            ))}
          </div>
        </>
      )}
      {}
      <div className="advice">
        <nav className="advice__nav">
          <p className="advice__info">ADVICE SCREEN</p>
          <p className="advice__user">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
        </nav>
        <div
          className="deliver__position"
          key={currentParcels[0]._id}
          style={{
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <div className="deliver__positioncontent">
            <p className="deliver__number">
              {currentParcels[0].numberOfParcel}
            </p>
            <p className="deliver__info">{`${currentParcels[0].name} ${currentParcels[0].surname}`}</p>
            <p className="deliver__info">{currentParcels[0].adress}</p>
            <p className="deliver__adress">{`${currentParcels[0].city} ${currentParcels[0].postCode}`}</p>
          </div>
        </div>
        <div className="advice__content">
          <p className="advice__text">Reason of advicing:</p>
          <button className="advice__selecttext" onClick={() => onReason()}>
            {chooseReason}
          </button>
          <p className="advice__text">Post Office:</p>
          <button className="advice__selecttext" onClick={() => onOffice()}>
            {chooseOffice}
          </button>
          <p className="advice__text">Place of leaving notification:</p>
          <button
            className="advice__selecttext"
            onClick={() => onPlaceNotification()}
          >
            {chooseNotifiedPlace}
          </button>
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
