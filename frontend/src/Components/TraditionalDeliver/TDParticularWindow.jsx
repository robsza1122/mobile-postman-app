import { useContext } from "react";
import { particularDeliveryInfo } from "../../utils/DataProvider";
import { PostManState } from "../../PostGlobalProvider";

export const TDParticularWindow = ({
  showSubjects,
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
}) => {
  const { downloadedParcels, setDownloadedParcels } = useContext(PostManState);
  return (
    <>
      <div className="td__background" onClick={() => showSubjects(false)}></div>
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
          console.log(id);
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
