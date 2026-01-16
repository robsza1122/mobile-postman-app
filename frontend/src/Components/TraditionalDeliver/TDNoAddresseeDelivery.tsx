import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";
import { CreateParcelOrder } from "../../types/parcel.type";

type TDNoAddresseeDeliveryProps = {
  markedParcels: CreateParcelOrder[];
  setShowParticularSubject: (show: boolean) => void;
  particularSubject: string;
  setNoAddressee: (noAddressee: boolean) => void;
  noAddressee: boolean;
  setInput: (input: string) => void;
}

export const TDNoAddresseeDelivery = ({
  markedParcels,
  setShowParticularSubject,
  particularSubject,
  setNoAddressee,
  noAddressee,
  setInput,
}: TDNoAddresseeDeliveryProps) => {
  const { downloadedParcels, setDownloadedParcels } = useContext(PostManState);
  return (
    <>
      {markedParcels[0]?.noAddressee && (
        <button
          className="td__particularcontent"
          style={{
            height: `${markedParcels[0]?.noAddressee && "35px"}`,
            width: "100%",
          }}
          onClick={() => {
            setShowParticularSubject(true);
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
                  if (markedParcels[0]._id === parcel._id) {
                    return {
                      ...parcel,
                      noAddressee: !parcel.noAddressee,
                    };
                  }

                  return parcel;
                    
                }),
              );
              setInput(
                !markedParcels[0]?.noAddressee
                  ? `${markedParcels[0]?.name} ${markedParcels[0]?.surname}`
                  : "",
              );
            }}
            style={{
              transform: `translateX(${markedParcels[0]?.noAddressee ? "45px" : "0"})`,
              transition: "0.3s ease transform",
            }}
          >
            {markedParcels[0]?.noAddressee ? "NO" : "YES"}
          </button>
        </div>
      </div>
    </>
  );
};
