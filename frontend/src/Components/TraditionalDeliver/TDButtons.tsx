import { Link } from "react-router-dom";
import classNames from "classnames";
import { CreateParcelOrder } from "../../types/parcel.type";
import { PostManState } from "../../PostGlobalProvider";
import { useContext } from "react";

type TDButtonsProps = {
  markParcel: CreateParcelOrder;
  savePoints: boolean;
  handleSignatureButton: () => void;
  handleSignatureLink: () => string | undefined;
}

export const TDButtons = ({
  markParcel,
  savePoints,
  handleSignatureButton,
  handleSignatureLink,
}: TDButtonsProps) => {
  const {downloadedParcels} = useContext(PostManState);
  const markedParcel = downloadedParcels.filter((parcel) => parcel.isMarked);
  return (
    <div className="td__buttons">
      <Link
        to={markParcel.amountOfTrials === 3  || markedParcel.length > 1 ? "" : "/deliveryCodeScreen"}
        className={classNames("td__button", {
          "td__button--disabled": markParcel.amountOfTrials === 3 || markedParcel.length > 1,
        })}
      >
        Delivery code
      </Link>
      <Link
        className={classNames("td__button", {
          "td__button--is-signed": savePoints,
        })}
        to={handleSignatureLink() || ""}
        onClick={() => handleSignatureButton()}
      >
        Signature
      </Link>
    </div>
  );
};
