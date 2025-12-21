import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";

export const TDNoAddresseeDelivery = ({
  markedParcel,
  setShowParticularSubject,
  particularSubject,
  setNoAddressee,
  noAddressee,
  setInput,
}) => {
  const { downloadedParcels, setDownloadedParcels } = useContext(PostManState);
  return (
    <>
      {markedParcel.noAddressee && (
        <button
          className="td__particularcontent"
          style={{
            height: `${markedParcel.noAddressee && "35px"}`,
            width: "100%",
          }}
          onClick={() => {
            setShowParticularSubject(true);
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
        >
          {particularSubject}
        </button>
      )}
      <div className="td__signcontainer">
        <p className="td__signtext">Addressee's signature</p>
        <div className="td__crane">
          <button
            className="td__signbutton"
            onClick={() => {
              setNoAddressee(!noAddressee);
              setDownloadedParcels(
                downloadedParcels.map((parcel) => {
                  if (markedParcel._id === parcel._id) {
                    return {
                      ...parcel,
                      noAddressee: !parcel.noAddressee,
                    };
                  }

                  return parcel;
                    
                }),
              );
              markedParcel.noAddressee = !markedParcel.noAddressee;
              setInput(
                !markedParcel.noAddressee
                  ? `${markedParcel.name} ${markedParcel.surname}`
                  : "",
              );
            }}
            style={{
              transform: `translateX(${markedParcel.noAddressee ? "45px" : "0"})`,
              transition: "0.3s ease transform",
            }}
          >
            {markedParcel.noAddressee ? "NO" : "YES"}
          </button>
        </div>
      </div>
    </>
  );
};
