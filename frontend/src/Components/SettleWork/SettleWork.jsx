import React, { useContext } from "react";
import "./SettleWork.scss";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";
import useParcels from "../../hooks/useParcels";

export const SettleWork = () => {
  const {
    currentUser,
    downloadedParcels,
    setDownloadedParcels,
    settled,
    setSettled,
    dayIsFinished,
  } = useContext(PostManState);
  const { parcels } = useParcels();
  const parcelsInDelivery = parcels.filter(
    (parcel) =>
      parcel.status[parcel.status.length - 1].name === "IN DELIVERY" &&
      parcel.forUser === currentUser.username,
  ).length;
  const parcelsDelivered = parcels.filter(
    (parcel) =>
      parcel.status[parcel.status.length - 1].name === "DELIVERED" &&
      parcel.forUser === currentUser.username,
  ).length;
  const parcelsAdviced = parcels.filter(
    (parcel) =>
      parcel.status[parcel.status.length - 1].name === "ADVICED" &&
      parcel.forUser === currentUser.username,
  ).length;
  const otherResults = parcels.filter(
    (parcel) =>
      parcel.status[parcel.status.length - 1].name === "OTHER" &&
      parcel.forUser === currentUser.username,
  ).length;
  const deliveredToZDO = parcels.filter(
    (parcel) =>
      parcel.status[parcel.status.length - 1].subject === "Delivered to ZDO" &&
      parcel.forUser === currentUser.username,
  ).length;
  const undeliveredToZDO = parcels.filter(
    (parcel) =>
      parcel.status[parcel.status.length - 1].subject ===
        "Parcel undelivered to ZDO" && parcel.forUser === currentUser.username,
  ).length;

  console.log(parcelsInDelivery);
  console.log(currentUser);
  console.log(settled);
  console.log(parcels);

  const handleSettlingButton = () => {
    if (parcelsInDelivery > 0) {
      alert("You have parcels in delivery. Settle them first.");
      return;
    } else if (parcelsInDelivery === 0) {
      setSettled(true);
      setDownloadedParcels([]);
    }
  };

  console.log(dayIsFinished);
  console.log(downloadedParcels)
  return (
    <div className="settle__content">
      <nav className="settle__nav">
        <p className="settle__info">SETTLE WORK DAY</p>
        <p className="settle__user">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
      </nav>
      {downloadedParcels.filter(parcel => parcel.status[parcel.status.length - 1].name !== "IN DELIVERY").length === 0 && dayIsFinished && (
        <>
          <div className="settle__noposition">
            There is no positions to settle
          </div>
          <div className="settle__line"></div>
        </>
      )}
      {parcels.filter(
        (parcel) =>
          currentUser.username === parcel.forUser && parcel.isDownloaded,
      ).length > 0 && !dayIsFinished && (
        <div
          className={classNames("settle__window", {
            "settle__window--settled": settled,
          })}
        >
          <div className="settle__data">
            <p className="settle__text">Parcels in Delivery</p>
            <p className="settle__number">[{parcelsInDelivery}]</p>
          </div>
          <div className="settle__data">
            <p className="settle__text">Parcels Delivered</p>
            <p className="settle__number">[{parcelsDelivered}]</p>
          </div>
          <div className="settle__data">
            <p className="settle__text">Parcels Adviced</p>
            <p className="settle__number">[{parcelsAdviced}]</p>
          </div>
          <div className="settle__data">
            <p className="settle__text">Other Results</p>
            <p className="settle__number">[{otherResults}]</p>
          </div>
          <div className="settle__data">
            <p className="settle__text">Parcels delivered to ZDO</p>
            <p className="settle__number">[{deliveredToZDO}]</p>
          </div>
          <div className="settle__data">
            <p className="settle__text">Parcels undelivered to ZDO</p>
            <p className="settle__number">[{undeliveredToZDO}]</p>
          </div>
          <div className="settle__data">
            <p className="settle__text">Parcels Pocztex Procedure</p>
            <p className="settle__number">[0]</p>
          </div>
        </div>
      )}

      <button
        className={classNames("settle__button", {
          "settle__button--nopositions": !downloadedParcels,
        })}
        onClick={() => handleSettlingButton()}
      >
        Settle defaultly
      </button>
    </div>
  );
};
