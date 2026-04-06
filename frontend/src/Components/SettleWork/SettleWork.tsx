import React, { useContext, useEffect } from "react";
import "./SettleWork.scss";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";
import useParcels from "../../hooks/useParcels";
import { placeOfAdvice } from "../../utils/DataProvider";
import { Link, useNavigate } from "react-router-dom";
import { SettleWorkButton } from "./SettleWorkButton";
import { Loading } from "../../Loading/Loading";
import { AppNavigation } from "../AppNavigation/AppNavigation";
import { SettledParcelsList } from "./SettledParcelsPositions";
import { AdvicedParcelsList } from "./AdvicedParcelsList";

export const SettleWork = () => {
  const {
    currentUser,
    downloadedParcels,
    setDownloadedParcels,
    settled,
    setSettled,
    dayIsFinished,
    isUpdatingParcel,
    setPlaceOfLeavingParcels,
  } = useContext(PostManState);
  const { parcels } = useParcels();
  const navigate = useNavigate();

  useEffect(() => {

    const handlePopState = () => {
      navigate('/workPage');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
  const savedParcels = downloadedParcels || [];
  const parcelsInDelivery = savedParcels.filter(
    (parcel) => parcel.status &&
      parcel.status[parcel.status.length - 1].name === "IN DELIVERY" &&
      parcel.forUser === currentUser.username,
  ).length;

  const handleSettlingButton = () => {
    if (parcelsInDelivery > 0) {
      alert("You have parcels in delivery. Settle them first.");
      return;
    } else if (parcelsInDelivery === 0) {
      setSettled(true);
    }
  };
  
  return (
    <>
      {isUpdatingParcel &&
        <Loading message="Updating parcel" />}
      <div className="settle__content">
        <AppNavigation username={currentUser.username} title="SETTLE WORK DAY" EMINumber={currentUser.EMINumber} />
        {downloadedParcels.filter(parcel => parcel.status && parcel.status[parcel.status.length - 1].name !== "IN DELIVERY").length === 0 && dayIsFinished && (
          <>
            <div className="settle__noposition">
              There is no positions to settle
            </div>
            <div className="settle__line"></div>
          </>
        )}
        {savedParcels.filter(
          (parcel) =>
            currentUser.username === parcel
              .forUser && parcel.isDownloaded,
        ).length > 0 && !dayIsFinished && (
            <>
              <SettledParcelsList />
              <AdvicedParcelsList />
            </>
          )}

        <SettleWorkButton handleSettlingButton={handleSettlingButton} name="Settle defaultly" />
      </div>
    </>
  );
};
