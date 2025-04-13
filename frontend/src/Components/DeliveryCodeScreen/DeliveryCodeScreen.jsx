import { useContext, useEffect } from "react";
import "./DeliveryCodeScreen.scss";
import PinInput from "react-pin-input";
import { PostManState } from "../../PostGlobalProvider";
import { useNavigate } from "react-router-dom";
import useParcels from '../../hooks/useParcels'

export const DeliveryCodeScreen = () => {
  const navigate = useNavigate();
  const {
    currentParcels,
    setDownloadedBook,
    downloadedBook,
    onDeliveryCode,
    setDeliveryCode,
    currentUser,
  } = useContext(PostManState);
  const {parcels} = useParcels();
  useEffect(() => {
    window.onpopstate = () => {
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
        <p className="dsc__cashondelivery">Cash on delivery {currentParcels[0].amount}</p>
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
