import { Link } from "react-router-dom";
import classNames from "classnames";
import useParcels from "../../hooks/useParcels";
import { markAllOnFalse } from "../../api/api";

export const TDButtons = ({
  markParcel,
  savePoints,
  handleSignatureButton,
  handleSignatureLink,
}) => {
  console.log(savePoints)
  return (
    <div className="td__buttons">
      <Link
        to={markParcel.amountOfTrials === 3 ? "" : "/deliveryCodeScreen"}
        className={classNames("td__button", {
          "td__button--disabled": markParcel.amountOfTrials === 3,
        })}
        disabled={markParcel.amountOfTrials === 3}
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
