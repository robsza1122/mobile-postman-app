import classNames from "classnames"
import { PostManState } from "../../PostGlobalProvider";
import { useContext } from "react";

export const SettledParcelsList = () => {
    const { settled, downloadedParcels, currentUser } = useContext(PostManState);
    const savedParcels = downloadedParcels || [];
    const parcelsInDelivery = savedParcels.filter(
        (parcel) => parcel.status &&
            parcel.status[parcel.status.length - 1].name === "IN DELIVERY" &&
            parcel.forUser === currentUser.username,
    ).length;
    const parcelsDelivered = savedParcels.filter(
        (parcel) => parcel.status &&
            parcel.status[parcel.status.length - 1].name === "DELIVERED" &&
            parcel.forUser === currentUser.username,
    ).length;
    const parcelsAdviced = savedParcels.filter(
        (parcel) => parcel.status &&
            parcel.status[parcel.status.length - 1].name === "ADVICED" &&
            parcel.forUser === currentUser.username,
    ).length;
    const otherResults = savedParcels.filter(
        (parcel) => parcel.status &&
            parcel.status[parcel.status.length - 1].name === "OTHER" &&
            parcel.forUser === currentUser.username,
    ).length;
    const deliveredToZDO = savedParcels.filter(
        (parcel) => parcel.status &&
            parcel.status[parcel.status.length - 1].subject === "Delivered to ZDO" &&
            parcel.forUser === currentUser.username,
    ).length;
    const undeliveredToZDO = savedParcels.filter(
        (parcel) => parcel.status &&
            parcel.status[parcel.status.length - 1].subject ===
            "Parcel undelivered to ZDO" && parcel.forUser === currentUser.username,
    ).length;
    return (
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
    )
}