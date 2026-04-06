import { useContext } from "react";
import { particularDeliveryInfo } from "../../utils/DataProvider";
import { PostManState } from "../../PostGlobalProvider";
import { CreateParcelOrder } from "../../types/parcel.type";

type TDParticularWindowProps = {
  setInput: (input: string) => void;
  input: string;
  markedParcel: CreateParcelOrder;
  chooseSubject: string;
  addresseesData: boolean;
  particularSubject: string;
  setChoosen: (choosen: string) => void;
  setShowParticularSubject: (show: boolean) => void;
  setParticularSubject: (subject: string) => void;
  choosen: string;
}

export const TDParticularWindow = ({
  setInput,
  input,
  markedParcel,
  chooseSubject,
  addresseesData,
  particularSubject,
  setChoosen,
  setShowParticularSubject,
  setParticularSubject,
  choosen,
}: TDParticularWindowProps) => {
  const { downloadedParcels, setDownloadedParcels } = useContext(PostManState);
  return (
    <>
      <div className="td__background" onClick={() => setShowParticularSubject(false)}></div>
      <div className="td__window">
        {particularDeliveryInfo.map((subject, id) => {
          const handleButtonSubject = () => {
            setInput(
              `${
                chooseSubject === "Addressee" && !addresseesData
                  ? `${markedParcel.name} ${markedParcel.surname}`
                  : ""
              }`,
            );
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
            if (markedParcel.noAddressee) {
              setInput(
                particularSubject === "Parcel left in place set with addressee"
                  ? ""
                  : input,
              );
            }
            if (
              particularSubject === "Parcel left in place set with addressee"
            ) {
              setInput("");
            }
            setShowParticularSubject(false);
            setParticularSubject(subject);
          };
          return (
            <button
              className="td__subjectposition"
              onMouseDown={() => setChoosen(subject)}
              onMouseUp={() => setChoosen("")}
              onClick={() => handleButtonSubject()}
              style={{
                backgroundColor: `${
                  choosen === subject ? "lightgray" : "white"
                }`,
              }}
              key={id}
            >
              {subject}
            </button>
          );
        })}
      </div>
    </>
  );
};
