import { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./DeliveryCodeScreen.scss";
import PinInput from "react-pin-input";
import { PostManState } from "../../PostGlobalProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { date } from "../../utils/currentDate";

export const DeliveryCodeScreen = () => {
  const [trialsAmount, setTrialsAmount] = useState(0);
  const [deliveryCode, setDeliveryCode] = useState();
  const { currentParcels, downloadedBook, setDownloadedBook } =
    useContext(PostManState);
  const navigate = useNavigate();
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
  });
  console.log(currentParcels);
  console.log(deliveryCode);
  const { user } = useAuth();

  const onConfirm = (clickedParcel) => {
    console.log(clickedParcel[0].deliveryCode);
    console.log(deliveryCode);
    if (deliveryCode === clickedParcel[0].deliveryCode) {
      setDownloadedBook(
        downloadedBook.map((parcel) => {
          if (parcel.deliveryCode === deliveryCode) {
          return {
            ...parcel,
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
      navigate("/workPage", {
        replace: true,
      });
    }
  };

  console.log(downloadedBook);
  console.log(currentParcels);

  return (
    <div className="dsc__content">
      <nav className="dsc__nav">
        <p className="dsc__text">Type Delivery Code</p>
        <p className="dsc__user">{`${user.username} [${user.EMINumber}]`}</p>
      </nav>
      <div className="dsc__body">
        <p className="dsc__number">
          {currentParcels.map((parcel) => {
            return parcel.numberOfParcel;
          })}
        </p>
        <p className="dsc__deliverytext">TYPE DELIVERY CODE</p>
        <p className="dsc__trials">Amount of trials {trialsAmount}/ 3</p>
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
          <button className="dsc__button">Deliver traditionally</button>
          <button
            className="dsc__button"
            onClick={() => onConfirm(currentParcels)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
