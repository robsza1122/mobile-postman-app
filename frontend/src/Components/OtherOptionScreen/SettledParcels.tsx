import { CreateParcelOrder } from "../../types/parcel.type"

export const SettledParcels = (parcel: CreateParcelOrder) => {
    return (
        <div
          className="deliver__positioncontent"
          style={{
            borderBottom: "1px solid gray",
          }}
        >
          <p className="deliver__number" style={{ marginLeft: "60px" }}>
            {parcel.numberOfParcel}
          </p>
          <p
            className="deliver__info"
            style={{ marginLeft: "60px" }}
          >{`${parcel.name} ${parcel.surname}`}</p>
          <p className="deliver__info" style={{ marginLeft: "60px" }}>
            {parcel.adress}
          </p>
          <p
            className="deliver__adress"
            style={{ marginLeft: "60px" }}
          >{`${parcel.city} ${parcel.postCode}`}</p>
        </div>
    )
}