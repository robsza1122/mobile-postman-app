import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";

export const TDSubjectWindow = ({
  subjectsOption,
  markedParcel,
  setShowSubjects,
  setChooseSubject,
  setChoosen,
  choosen,
  setAddresseesData,
  setInput,
}) => {
  const { downloadedParcels, setDownloadedParcels } = useContext(PostManState);
  return (
    <>
      <div
        className="td__background"
        onClick={() => setShowSubjects(false)}
      ></div>
      <div className="td__window">
        {subjectsOption.map((subject, id) => {
          const handleButtonSubject = () => {
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

            setInput(
              `${
                subject === "Addressee"
                  ? `${markedParcel.name} ${markedParcel.surname}`
                  : ""
              }`,
            );
            setAddresseesData(subject === "Addressee" ? true : false);
            setShowSubjects(false);
            setChooseSubject(subject);
          };
          console.log(id);
          return (
            <button
              className="td__subjectposition"
              onMouseDown={() => setChoosen(subject)}
              onMouseUp={() => setChoosen("")}
              onClick={() => handleButtonSubject()}
              style={{
                backgroundColor: `${choosen === subject ? "lightgray" : "white"}`,
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
