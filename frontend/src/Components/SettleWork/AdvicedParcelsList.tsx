import classNames from "classnames";
import { Link } from "react-router-dom";
import { PostManState } from "../../PostGlobalProvider";
import { useContext } from "react";
import { placeOfAdvice } from "../../utils/DataProvider";

export const AdvicedParcelsList = () => {
    const {settled, currentUser, downloadedParcels, setPlaceOfLeavingParcels} = useContext(PostManState);
    const savedParcels = downloadedParcels || [];
    return (
        <div className={classNames("settle__advicing-offices", {
                        "settle__advicing-offices--settled": settled,
                      })}>
                        <p className="settle__advicing-offices-text">Advicing offices:</p>
                        <ul className="settle__advicing-offices-list">
                          {placeOfAdvice.map((office, id) => {
                            const amountOfAdvicedParcelsBeforeLeaving = savedParcels.filter(
                              (parcel) =>
                                parcel.status &&
                                parcel.status[parcel.status.length - 1].name === "ADVICED" &&
                                parcel.status[parcel.status.length - 1].officeOfAdvice === office &&
                                parcel.placeOfLeavingParcel === "" &&
                                parcel.forUser === currentUser.username,
                            ).length;
        
                            const amountOfAdvicedParcelsAfterLeaving = savedParcels.filter(
                              (parcel) =>
                                parcel.status &&
                                parcel.status[parcel.status.length - 1].name === "ADVICED" &&
                                parcel.status[parcel.status.length - 1].officeOfAdvice === office &&
                                parcel.placeOfLeavingParcel !== "" &&
                                parcel.forUser === currentUser.username,
                            ).length;
        
                            const amountOfAdvicedParcels = savedParcels.filter(
                              (parcel) =>
                                parcel.status &&
                                parcel.status[parcel.status.length - 1].name === "ADVICED" &&
                                parcel.status[parcel.status.length - 1].officeOfAdvice === office &&
                                parcel.forUser === currentUser.username,
                            ).length;
                            return (
                              <Link
                                to={amountOfAdvicedParcels > 0 ? '/leaveParcelOnPostBranch' : ''}
                                className={classNames("settle__advicing-offices-link", {
                                  "settle__advicing-offices-link-active": amountOfAdvicedParcelsBeforeLeaving > 0,
                                })}
                                onClick={() => setPlaceOfLeavingParcels(office)}>
                                <li key={id} className={classNames("settle__advicing-offices-list-item", {
                                  "settle__advicing-offices-list-item-active": amountOfAdvicedParcelsBeforeLeaving > 0 && amountOfAdvicedParcelsAfterLeaving === 0,
                                  "settle__advicing-offices-list-item-settled": amountOfAdvicedParcelsAfterLeaving > 0,
                                })}>
                                  <p className="settle__advicing-offices-list-item-name">{office}</p>
                                  <p className="settle__advicing-offices-list-item-number">{`[${amountOfAdvicedParcelsBeforeLeaving}]`}</p>
                                </li>
                              </Link>
                            );
                          })}
                        </ul>
                      </div>
    )
}