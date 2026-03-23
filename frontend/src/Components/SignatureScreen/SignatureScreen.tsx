import "./SignatureScreen.scss";
import { useContext, useEffect } from "react";
import { PostManState } from "../../PostGlobalProvider";
import SignaturePad from "react-signature-canvas";
import classNames from "classnames";
import { useMutation } from "@tanstack/react-query";
import { addDeliveredStatus } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AppNavigation } from "../AppNavigation/AppNavigation";
import { SignatureOptions } from "./SignatureOption";

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

  const markedParcels = (downloadedParcels || []).filter(
    (parcel) => parcel.isMarked,
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handlePop = () => {
      setSavePoints(null);
      navigate("/traditionalDeliver", { replace: true });
    };
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handlePop);

    return () => {
      window.removeEventListener("popstate", handlePop);
    };
  }, [navigate, setSavePoints]);

  const saveSignature = () => {
    navigate("/traditionalDeliver");
  };


  return (
    <div className="sign__content">
      <AppNavigation
        username={currentUser.username}
        title="SIGNATURE SCREEN"
        EMINumber={currentUser.EMINumber}
      />
      <p className="sign__signatureinfo">{`Addressee: ${markedParcels[0].name} ${markedParcels[0].surname} Address: ${markedParcels[0].adress} City: ${markedParcels[0].city} PostCode: ${markedParcels[0].postCode}`}</p>
      <div className="sign__signatureblock">
        <SignatureOptions
          savePoints={savePoints}
          saveSignature={saveSignature}
          clearSignature={clearSignature}
        />
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
