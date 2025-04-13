import { useContext } from "react";
import "./BookList.scss";
import { Loading } from "../../Loading/Loading";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import { getInDeliveryStatus } from "../../api/api";
import useParcels from "../../hooks/useParcels";

export const BookList = () => {
  const { downloadedBook, currentUser } = useContext(PostManState);
  const { parcels } = useParcels();
  console.log(parcels);
  return (
    <nav className="booklist__nav">
      <p className="booklist__username">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
      <p className="booklist__text">BOOK LIST</p>
      <div className="booklist__content">
        {downloadedBook.map((parcel) => {
          return (
                <div
                  className={classNames("booklist__position", {
                    "booklist__position--delivered":
                      parcel.status[parcel.status.length - 1].name ===
                      "DELIVERED",
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
