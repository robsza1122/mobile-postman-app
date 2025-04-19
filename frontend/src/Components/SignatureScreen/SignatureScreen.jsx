import "./SignatureScreen.scss";
import { useContext, useEffect } from "react";
import { PostManState } from "../../PostGlobalProvider";
import SignaturePad from "react-signature-canvas";
import classNames from "classnames";

export const SignatureScreen = () => {
  const {
    currentParcels,
    savePoints,
    setSavePoints,
    clearSignature,
    saveSignature,
    setDownloadedBook,
    downloadedBook,
    currentUser,
    signatureRef,
  } = useContext(PostManState);

  useEffect(() => {
    window.onpopstate = () => {
      if (currentParcels[0].isSignature) {
        savePoints([]);
        setDownloadedBook(
          downloadedBook.map((parcel) => {
            if (currentParcels[0]._id === parcel._id) {
              return {
                ...parcel,
                isSignature: false,
                signature: parcel.signature.filter((sign) => !sign),
              };
            }

            return parcel;
          })
        );
      }
    };
  });

  console.log(downloadedBook);
  console.log(savePoints);

  return (
    <div className="sign__content">
      <nav className="sign__nav">
        <p className="sign__info">SIGNATURE SCREEN</p>
        <p className="sign__user">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
      </nav>
      <p className="sign__signatureinfo">{`Addressee: ${currentParcels[0].name} ${currentParcels[0].surname} Address: ${currentParcels[0].address} City: ${currentParcels[0].city} PostCode: ${currentParcels[0].postCode}`}</p>
      <div className="sign__signatureblock">
        <div className="sign__options">
          <button
            className={classNames("sign__button", {
              "sign__button--disabled": savePoints.length === 0,
            })}
            onClick={() => clearSignature()}
          >
            Clear
          </button>
          <div className="sign__signinfo">
            Write your signature into the white square below.
          </div>
          <button
            className={classNames("sign__button", {
              "sign__button--disabled": savePoints.length === 0,
            })}
            onClick={() => saveSignature()}
          >
            Accept
          </button>
        </div>
        <SignaturePad
          ref={signatureRef}
          onEnd={(e) => {
            setSavePoints(signatureRef.current.toDataURL("image/png"));
          }}
          canvasProps={{
            className: "sign__signature",
          }}
        />
      </div>
    </div>
  );
};
