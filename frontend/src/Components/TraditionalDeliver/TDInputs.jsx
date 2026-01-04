import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";
import { clearSignatureByButton } from "../../utils/helpers/statusObjects";
import classNames from "classnames";

export const TDInputs = ({
  markedParcels,
  setInput,
  input,
  chooseSubject,
  setAddresseesData,
  addresseesData,
  particularSubject,
}) => {
  const { downloadedParcels, setDownloadedParcels } = useContext(PostManState);
  console.log(addresseesData);
  return (
    <div className="td__inputs">
      {!markedParcels[0]?.noAddressee && (
        <>
          <input
            type="text"
            className="td__input"
            defaultValue={`${markedParcels[0]?.name} ${markedParcels[0]?.surname}`}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              clearSignatureByButton(downloadedParcels, markedParcels);
            }}
            placeholder="Write name and surname"
          />
          <div className="td__inputcontent">
            <p className="td__inputinfo">Copy from addressee's data</p>
            <input
              type="checkbox"
              className={classNames("td__checkbox", {
                "td__checkbox--checked": addresseesData,
              })}
              checked={!!addresseesData}
              disabled={
                chooseSubject !== "Addressee" || markedParcels.length > 1
              }
              onClick={() => {
                if (chooseSubject !== "Addressee" || markedParcels.length > 1)
                  return;

                const newState = !addresseesData;
                setAddresseesData(newState);

                if (newState) {
                  setInput(
                    `${markedParcels[0]?.name} ${markedParcels[0]?.surname}`,
                  );
                } else {
                  setInput("");
                  clearSignatureByButton(downloadedParcels, markedParcels);
                }
              }}
            />
          </div>
        </>
      )}
      {markedParcels[0]?.noAddressee &&
        particularSubject === "Parcel left in place set with addressee" && (
          <input
            type="text"
            className="td__input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setDownloadedParcels(
                downloadedParcels.map((parcel) => {
                  if (parcel._id === markedParcels._id) {
                    return {
                      ...parcel,
                      deliveryInput: "",
                      isSignature: false,
                      signature: null,
                    };
                  }

                  return parcel;
                }),
              );
            }}
            placeholder="Type place of delivery..."
            style={{
              width: "100%",
            }}
          />
        )}
    </div>
  );
};
