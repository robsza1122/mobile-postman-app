import classNames from "classnames";
import { StatusHandlingPositionProps } from "./StatusHandlingPosition";

export const StatusHandlingVerifiedPosition = ({ parcel, handleMarkParcel }: StatusHandlingPositionProps) => {

  return (
    <div className="deliver__position" key={parcel._id}>
      <div className="deliver__positioncontent">
        <p className="deliver__number">{parcel.numberOfParcel}</p>
        <p className="deliver__info">{`${parcel.name} ${parcel.surname}`}</p>
        <p className="deliver__info">{parcel.adress}</p>
        <p className="deliver__adress">{`${parcel.city} ${parcel.postCode}`}</p>
      </div>
      <div className="deliver__inputcash">
        <input
          type="checkbox"
          className={classNames("deliver__checkbox", {
            "deliver__checkbox--is-checked": parcel.isMarkedVERIFICATION,
          })}
          checked={parcel.isMarkedVERIFICATION}
          onClick={() => handleMarkParcel(parcel._id, !parcel.isMarkedVERIFICATION)}
        />
        {parcel.amount !== 0 && (
          <p className="deliver__cash">
            {!parcel.amount.toString().includes(".")
              ? `${parcel.amount}.00`
              : `${parcel.amount}`}
          </p>
        )}
      </div>
    </div>
  );
};
