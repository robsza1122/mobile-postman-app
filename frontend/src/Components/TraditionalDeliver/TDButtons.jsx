import { Link } from "react-router-dom";
import classNames from "classnames";

export const TDButtons = ({
  markParcel,
  input,
  particularSubject,
  savePoints,
  handleSignatureButton
}) => {
  return (
    <div className="td__buttons">
      <Link
        to={markParcel.amountOfTrials === 3 ? "" : "/deliveryCodeScreen"}
        className={classNames("td__button", {
          "td__button--disabled": markParcel.amountOfTrials === 3,
        })}
        disabled={markParcel.amountOfTrials}
      >
        Delivery code
      </Link>
      <Link
        className={classNames("td__button", {
          "td__button--is-signed": savePoints,
        })}
        to={`${
          markParcel.noAddressee
            ? input === "" &&
              particularSubject === "Parcel left in place set with addressee"
              ? ""
              : "/signatureScreen"
            : `${input === "" ? "" : "/signatureScreen"}`
        }`}
        onClick={() => handleSignatureButton()}
      >
        Signature
      </Link>
    </div>
  );
};
