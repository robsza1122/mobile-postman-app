export const OtherOptionExceptions= ({chooseDetails, setInput, input}) => {
    return (
        <>
        {chooseDetails === "Parcel returned from other reason" && (
            <>
              <p className="advice__reason">Other reason:</p>
              <input
                type="text"
                className="advice__input"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Type other reason..."
              />
            </>
          )}

          {chooseDetails === "Parcel lost" && (
            <>
              <p className="advice__reason">Reason:</p>
              <input
                type="text"
                className="advice__input"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Type reason..."
              />
            </>
          )}
          {chooseDetails === "Parcel left in shop, ORLEN, ParcelPoint" && (
            <>
              <p className="advice__reason">
                Name and surname receiving person:
              </p>
              <input
                type="text"
                className="advice__input"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Type name and surname..."
              />
            </>
          )}
          </>
    )
}