import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";
import { clearSignatureByButton } from "../../utils/helpers/statusObjects";

export const TDSubjectWindow = ({
  subjectsOption,
  markedParcels,
  setShowSubjects,
  setChooseSubject,
  setChoosen,
  choosen,
  setAddresseesData,
  setInput,
}) => {
  const { downloadedParcels, setDownloadedParcels, setSavePoints } = useContext(PostManState);
  return (
    <>
      <div
        className="td__background"
        onClick={() => setShowSubjects(false)}
      ></div>
      <div className="td__window">
        {subjectsOption.map((subject, id) => {
            const handleInput = () => {
    if (subject === 'Addressee' && markedParcels.length === 1) {
      return `${markedParcels[0].name} ${markedParcels[0].surname}`;
    } else if (subject === 'Addressee' && markedParcels.length > 1) {
      return '';
    } else if (subject !== 'Addressee') {
      return '';
    }
  }
          const handleButtonSubject = () => {
            setDownloadedParcels(
              clearSignatureByButton(downloadedParcels, markedParcels),
            );

            setInput(
              handleInput(),
            );
            setAddresseesData(subject === "Addressee" ? true : false);
            setShowSubjects(false);
            setChooseSubject(subject);
            setSavePoints(null);
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
