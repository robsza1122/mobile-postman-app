import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";

export const TDInputs = ({
  markedParcel,
  setInput,
  input,
  chooseSubject,
  setAddresseesData,
  addresseesData,
  particularSubject,
}) => {
  const { downloadedParcels, setDownloadedParcels } = useContext(PostManState);
  return (
    <div className="td__inputs">
      {!markedParcel.noAddressee && (
        <>
          <input
            type="text"
            className="td__input"
            defaultValue={`${markedParcel.name} ${markedParcel.surname}`}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
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
            placeholder="Write name and surname"
          />
          <div className="td__inputcontent">
            <p className="td__inputinfo">Copy from addressee's data</p>
            <input
              type="checkbox"
              className="td__checkbox"
              value={markedParcel.noAddressee}
              disabled={chooseSubject !== "Addressee"}
              onClick={() => {
                if (chooseSubject === "Addressee") {
                  setInput(`${markedParcel.name} ${markedParcel.surname}`);
                }
                setAddresseesData((value) => !value);
                setInput(
                  addresseesData && chooseSubject === "Addressee"
                    ? `${markedParcel.name} ${markedParcel.surname}`
                    : "",
                );
                setDownloadedParcels(
                  downloadedParcels.map((parcel) => {
                    if (parcel._id === markedParcel._id) {
                      parcel.status[parcel.status.length - 1].noAddressee =
                        true;
                    }

                    return parcel;
                  }),
                );
              }}
            />
          </div>
        </>
      )}
      {markedParcel.noAddressee &&
        particularSubject === "Parcel left in place set with addressee" && (
          <input
            type="text"
            className="td__input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setDownloadedParcels(
                downloadedParcels.map((parcel) => {
                  if (parcel._id === markedParcel._id) {
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
