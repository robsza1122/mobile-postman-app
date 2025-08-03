import useParcels from "../../hooks/useParcels";

export const TrailConfirmBook = ({parcelsNumber, deliveryBookLength, setOpenBook, setParcelsNumber, typedParcelBookNumber, setLoadingText, setLoading, setVerifyBook}) => {
      const onConfirmationSuccess = () => {
    setLoadingText("downloading book...");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    setVerifyBook(true);
    setOpenBook(false);
  };
    return (
                    <>
              <div className="trail__confirmBook"></div>
              <div className="trail__confirmwindow">
                <div className="trail__redblock">
                  <p className="trail__downloaderror">
                    Delivery Book{" "}
                    {typedParcelBookNumber}
                  </p>
                </div>
                <div className="trail__infocontent trail__infocontent-confirm">
                  <div className="trail__infos">
                    <p className="trail__info">
                      Delivery book with number {parcelsNumber} was found:
                    </p>
                    <p className="trail__info">
                      Number of parcel in this book:{" "}
                      {deliveryBookLength}
                    </p>
                    <p className="trail__info">
                      Do you want to download delivery book?
                    </p>
                  </div>
                  <div className="trail__confirmedbuttons">
                    <button
                      className="trail__confirmedbutton trail__confirmedbuttonYES"
                      onClick={() => onConfirmationSuccess()}
                    >
                      Yes
                    </button>
                    <button
                      className="trail__confirmedbutton trail__confirmedbuttonNO"
                      onClick={() => {
                        setOpenBook(false);
                        setParcelsNumber("");
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </>
    )
}