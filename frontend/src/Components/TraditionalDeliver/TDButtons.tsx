import { Link } from "react-router-dom";
import classNames from "classnames";
import { CreateParcelOrder } from "../../types/parcel.type";

type TDButtonsProps = {
  markParcel: CreateParcelOrder;
  savePoints: boolean;
  handleSignatureButton: () => void;
  handleSignatureLink: () => string;
}

export const TDButtons = ({
  markParcel,
  savePoints,
  handleSignatureButton,
  handleSignatureLink,
}: TDButtonsProps) => {
  console.log(savePoints)
  return (
    <div className="td__buttons">
      <Link
        to={markParcel.amountOfTrials === 3 ? "" : "/deliveryCodeScreen"}
        className={classNames("td__button", {
          "td__button--disabled": markParcel.amountOfTrials === 3,
        })}
        aria-disabled={markParcel.amountOfTrials === 3}
      >
        Delivery code
      </Link>
      <Link
        className={classNames("td__button", {
          "td__button--is-signed": savePoints,
        })}
        to={handleSignatureLink()}
        onClick={() => handleSignatureButton()}
      >
        Signature
      </Link>
    </div>
  );
};
