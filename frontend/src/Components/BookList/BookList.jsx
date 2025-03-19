import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import "./BookList.scss";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";

export const BookList = () => {
    const {user} = useAuth();
    const {downloadedBook} = useContext(PostManState);
    console.log(downloadedBook);
    return (
        <nav className="booklist__nav">
            <p className="booklist__username">{`${user.username} [${user.EMINumber}]`}</p>
            <p className="booklist__text">BOOK LIST</p>
            <div className="booklist__content">
            {downloadedBook.map(parcel => (
                <div className={classNames("booklist__position", {
                    "booklist__position--delivered": parcel.status[parcel.status.length - 1].name === "DELIVERED"
                })} key={parcel._id}>
                    <p className={classNames("booklist__number", {
                        "booklist__number--marked": parcel.status[parcel.status.length - 1].name === "DELIVERED"
                    })}>{parcel.numberOfParcel}</p>
                    <p className={classNames("booklist__info", {
                        "booklist__info--marked": parcel.status[parcel.status.length - 1].name === "DELIVERED"
                    })}>{`${parcel.name} ${parcel.surname}`}</p>
                    <p className={classNames("booklist__info", {
                        "booklist__info--marked": parcel.status[parcel.status.length - 1].name === "DELIVERED"
                    })}>{parcel.adress}</p>
                    <p className={classNames("booklist__adress", {
                        "booklist__adress--marked": parcel.status[parcel.status.length - 1].name === "DELIVERED"
                    })}>{`${parcel.city} ${parcel.postCode}`}</p>
                </div>
            ))}
            </div>
        </nav>
    )
}