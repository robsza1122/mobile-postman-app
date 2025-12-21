import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";

export const TDSubjectOfDelivery = ({
  setShowSubjects,
  openList,
  markedParcel,
  chooseSubject,
}) => {
  const { downloadedParcels, setDownloadedParcels } = useContext(PostManState);
  return (
    <div
      className={classNames("td__deliverycontent", {
        "td__deliverycontent--opened-list": openList,
      })}
    >
      <p className="td__subject">Subject Of Delivery:</p>
      <button
        className="td__subjectcontent"
        onClick={() => {
          setShowSubjects(true);
          setDownloadedParcels(
            downloadedParcels.map((parcel) => {
              if (parcel._id === markedParcel._id) {
                return {
                  ...parcel,
                  isSignature: false,
                  signature: null,
                };
              }

              return parcel;
            }),
          );
        }}
        disabled={markedParcel.noAddressee}
      >
        {`${
          markedParcel.noAddressee
            ? "Person authorized to receive parcel"
            : chooseSubject
        }`}
      </button>
    </div>
  );
};
