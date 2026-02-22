import React from "react";
import { CreateParcelOrder } from "../../types/parcel.type";
type TDListProps = {
  findParcel: CreateParcelOrder[];
  openList: string | null;
  handleList: (id: string | undefined) => void;
}

export const TDList = ({ findParcel, openList, handleList }: TDListProps) => {
  const openParcel = findParcel.find((p) => p._id === openList);
  const openIndex = openParcel ? findParcel.indexOf(openParcel) : -1;

  return (
    <div className="td__list">
      {findParcel.map((parcel) => {
        const idx = findParcel.indexOf(parcel);
        const isNextOfOpen = openIndex !== -1 && idx === openIndex + 1;

        return (
          <React.Fragment key={parcel._id}>
            <button
              className="td__listcontent"
              onClick={() => handleList(parcel._id)}
              style={{ marginTop: isNextOfOpen ? "81px" : undefined }}
            >
              <p
                className="td__listarrow"
                style={{
                  transform: `${openList === parcel._id ? "rotate(0.25turn)" : ""}`,
                }}
              >
                {">"}
              </p>
              <p className="td__listposition">{parcel.numberOfParcel}</p>
              {parcel.amount !== 0 && <img src="src/image/triangle-exclamation.svg" alt="exclamation" className="td__exclamation" />}
            </button>
            {openList === parcel._id && (
              <div className="td__listinfocontent">
                <div className="td__infocontent">
                  <p className="td__infotext">Cash On Delivery:</p>
                  <div className="td__datacontent">
                    <img
                      src="src/image/coins.svg"
                      alt=""
                      className="td__infoimage"
                    />
                    <p className="td__infodata">{parcel.amount}</p>
                  </div>
                </div>
                <div className="td__infocontent">
                  <p className="td__infotext">Weight:</p>
                  <div className="td__datacontent">
                    <img
                      src="src/image/weight.svg"
                      alt=""
                      className="td__infoimage"
                    />
                    <p className="td__infodata">2.00</p>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
