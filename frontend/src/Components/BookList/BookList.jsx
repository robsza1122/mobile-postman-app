import { useContext, useEffect } from "react";
import "./BookList.scss";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";
import useParcels from "../../hooks/useParcels";

export const BookList = () => {
  const { currentUser } = useContext(PostManState);
  const { parcels } = useParcels();
  console.log(parcels);

  useEffect(() => {
    window.onpopstate = () => {
      navigate("/trailOption");
    };
  });

  const usersParcels = parcels.filter(parcel => parcel.forUser === currentUser.username && parcel.isDownloaded);

  return (
    <nav className="booklist__nav">
      <p className="booklist__username">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
      <p className="booklist__text">BOOK LIST</p>
      <div className="booklist__content">
        {usersParcels.map((parcel) => {
          return (
            <div
              className={classNames("booklist__position", {
                                "booklist__position--delivered":
                  parcel.status[parcel.status.length - 1].name === "IN DELIVERY",
                "booklist__position--delivered":
                  parcel.status[parcel.status.length - 1].name === "DELIVERED",
                "booklist__position--adviced":
                  parcel.status[parcel.status.length - 1].name === "ADVICED",
                "booklist__position--other":
                  parcel.status[parcel.status.length - 1].name === "OTHER",
              })}
              key={parcel._id}
            >
              <p
                className={classNames("booklist__number", {
                  "booklist__number--marked":
                    parcel.status[parcel.status.length - 1].name ===
                    "DELIVERED",
                })}
              >
                {parcel.numberOfParcel}
              </p>
              <p
                className={classNames("booklist__info", {
                  "booklist__info--marked":
                    parcel.status[parcel.status.length - 1].name ===
                    "DELIVERED",
                })}
              >{`${parcel.name} ${parcel.surname}`}</p>
              <p
                className={classNames("booklist__info", {
                  "booklist__info--marked":
                    parcel.status[parcel.status.length - 1].name ===
                    "DELIVERED",
                })}
              >
                {parcel.adress}
              </p>
              <p
                className={classNames("booklist__adress", {
                  "booklist__adress--marked":
                    parcel.status[parcel.status.length - 1].name ===
                    "DELIVERED",
                })}
              >{`${parcel.city} ${parcel.postCode}`}</p>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
