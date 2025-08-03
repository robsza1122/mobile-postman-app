export const TrailConfirmBookError = ({setShowError, setParcelsNumber, parcelsNumber, setLoading, setLoadingText }) => {
      const onConfirmationFalse = () => {
    setLoadingText("Loading books...");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoadingText("");
    }, 1000);
  };
    return (
        <>
            <div className="trail__confirmBook"></div>
            <div className="trail__confirmwindow">
              <div className="trail__redblock">
                <p className="trail__downloaderror">Download Error</p>
              </div>
              <div className="trail__infocontent">
                <div className="trail__infos">
                  <p className="trail__info">
                    Some problem with downloading parcels occured:
                  </p>
                  <p className="trail__info">{parcelsNumber}</p>
                  <p className="trail__info">
                    Reason: Cannot find book to download: ({parcelsNumber})
                  </p>
                  <p className="trail__info">Do you want to try again?</p>
                </div>
                <div className="trail__confirmedbuttons">
                  <button
                    className="trail__confirmedbutton trail__confirmedbuttonYES"
                    onClick={() => onConfirmationFalse()}
                  >
                    Yes
                  </button>
                  <button
                    className="trail__confirmedbutton trail__confirmedbuttonNO"
                    onClick={() => {
                      setShowError(false);
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