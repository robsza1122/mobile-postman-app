import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";
import { CreateParcelOrder } from "../../types/parcel.type";

type TDSubjectOfDeliveryProps = {
  setShowSubjects: (show: boolean) => void;
  openList: string;
  markedParcels: CreateParcelOrder[];
  chooseSubject: string;
}

export const TDSubjectOfDelivery = ({
  setShowSubjects,
  openList,
  markedParcels,
  chooseSubject,
}: TDSubjectOfDeliveryProps) => {
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
              if (parcel._id === markedParcels[0]._id) {
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
        disabled={markedParcels[0]?.noAddressee}
      >
        {`${
          markedParcels[0]?.noAddressee
            ? "Person authorized to receive parcel"
            : chooseSubject
        }`}
      </button>
    </div>
  );
};
