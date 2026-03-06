import { useContext, useEffect } from "react";
import "./BookList.scss";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";
import useParcels from "../../hooks/useParcels";

export const BookList = () => {
  const { currentUser, downloadedParcels } = useContext(PostManState);
  const { parcels } = useParcels();
  console.log(parcels);

  console.log(downloadedParcels);


  return (
    <nav className="booklist__nav">
      <p className="booklist__username">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
      <p className="booklist__text">BOOK LIST</p>
      <div className="booklist__content">
        {downloadedParcels.map((parcel) => {
          const lastStatusName = parcel?.status?.[parcel.status.length - 1]?.name;
          return (
            <div
              className={classNames("booklist__position", {
                                "booklist__position--in-delivery":
                  lastStatusName === "IN DELIVERY",
                "booklist__position--delivered":
                  lastStatusName === "DELIVERED",
                "booklist__position--adviced":
                  lastStatusName === "ADVICED",
                "booklist__position--other":
                  lastStatusName === "OTHER",
              })}
              key={parcel._id}
            >
              <p
                className={classNames("booklist__number", {
                  "booklist__number--marked":
                    lastStatusName === "DELIVERED",
                })}
              >
                {parcel.numberOfParcel}
              </p>
              <p
                className={classNames("booklist__info", {
                  "booklist__info--marked":
                    lastStatusName === "DELIVERED",
                })}
              >{`${parcel.name} ${parcel.surname}`}</p>
              <p
                className={classNames("booklist__info", {
                  "booklist__info--marked":
                    lastStatusName === "DELIVERED",
                })}
              >
                {parcel.adress}
              </p>
              <p
                className={classNames("booklist__adress", {
                  "booklist__adress--marked":
                    lastStatusName === "DELIVERED",
                })}
              >{`${parcel.city} ${parcel.postCode}`}</p>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
