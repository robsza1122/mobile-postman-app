export const TDList = ({
    findParcel,
    openList,
    handleList,
}) => {
    return (
        <div className="td__list">
          {findParcel.map((parcel) => {
            return (
              <>
                <button
                  className="td__listcontent"
                  key={parcel._id}
                  onClick={() => handleList()}
                >
                  <p
                    className="td__listarrow"
                    style={{
                      transform: `${openList ? "rotate(0.25turn)" : ""}`,
                    }}
                  >
                    {">"}
                  </p>
                  <p className="td__listposition">{parcel.numberOfParcel}</p>
                </button>
                {openList && (
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
              </>
            );
          })}
        </div>
    )
}