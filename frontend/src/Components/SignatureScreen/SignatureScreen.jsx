import "./SignatureScreen.scss";
import { useContext, useEffect } from "react";
import useParcels, { PARCELS } from "../../hooks/useParcels";
import { PostManState } from "../../PostGlobalProvider";
import SignaturePad from "react-signature-canvas";
import classNames from "classnames";
import { useMutation } from "@tanstack/react-query";
import { addDeliveredStatus } from "../../api/api";
import { navigate } from "../../api/navigation";

export const SignatureScreen = () => {
  const {
    savePoints,
    setSavePoints,
    clearSignature,
    setDownloadedParcels,
    downloadedParcels,
    currentUser,
    signatureRef,
  } = useContext(PostManState);


  const { parcels } = useParcels();

  const markedParcels = parcels.filter((parcel) => parcel.isMarked);

  useEffect(() => {
    window.onpopstate = () => {
      if (markedParcels[0].isSignature) {
        savePoints([]);
        setDownloadedParcels(
          downloadedParcels.map((parcel) => {
            if (markedParcels[0]._id === parcel._id) {
              return {
                ...parcel,
                isSignature: false,
                signature: null,
              };
            }

            return parcel;
          }),
        );
      }
      navigate("/ML");
      window.location.reload();
    };
  });

  const saveSignature = () => {
    navigate('/traditionalDeliver');
  }

  console.log(downloadedParcels);
  console.log(savePoints);

  return (
    <div className="sign__content">
      <nav className="sign__nav">
        <p className="sign__info">SIGNATURE SCREEN</p>
        <p className="sign__user">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
      </nav>
      <p className="sign__signatureinfo">{`Addressee: ${markedParcels[0].name} ${markedParcels[0].surname} Address: ${markedParcels[0].adress} City: ${markedParcels[0].city} PostCode: ${markedParcels[0].postCode}`}</p>
      <div className="sign__signatureblock">
        <div className="sign__options">
          <button
            className={classNames("sign__button", {
              "sign__button--disabled": !savePoints,
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
              "sign__button--disabled": !savePoints,
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
