import React, { useContext } from 'react';
import './SettleWork.scss';
import { PostManState } from '../../PostGlobalProvider';
import classNames from 'classnames';

export const SettleWork = () => {
    const { currentUser, downloadedBook, setDownloadedBook } = useContext(PostManState);
    const parcelsInDelivery = downloadedBook.filter((parcel) => parcel.status[parcel.status.length - 1].name === "IN DELIVERY").length;
    const parcelsDelivered = downloadedBook.filter((parcel) => parcel.status[parcel.status.length - 1].name === "DELIVERED").length;
    const parcelsAdviced = downloadedBook.filter((parcel) => parcel.status[parcel.status.length - 1].name === "ADVICED").length;
    const otherResults = downloadedBook.filter((parcel) => parcel.status[parcel.status.length - 1].name === "OTHER").length;
    const deliveredToZDO = downloadedBook.filter((parcel) => parcel.status[parcel.status.length - 1].subject === "Delivered to ZDO").length;
    const undeliveredToZDO = downloadedBook.filter((parcel) => parcel.status[parcel.status.length - 1].subject === "Parcel undelivered to ZDO").length;

    console.log(parcelsInDelivery);

       const {settled, setSettled} = useContext(PostManState);

    const handleSettlingButton = () => {
        if (parcelsInDelivery > 0) {
            alert("You have parcels in delivery. Settle them first.");
            return;
        } else if (parcelsInDelivery === 0) {
            setSettled(true);
            setDownloadedBook([]);
        }
    }
    return (
        <div className="settle__content">
        <nav className="settle__nav">
        <p className="settle__info">SETTLE WORK DAY</p>
        <p className="settle__user">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
      </nav>
      <div className={classNames("settle__window", {
        "settle__window--settled": settled,
      })}>
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
      <button className="settle__button" onClick={() => handleSettlingButton()}>Settle defaultly</button>
      </div>
    );
}