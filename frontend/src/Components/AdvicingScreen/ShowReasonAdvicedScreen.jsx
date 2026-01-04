export const ShowReasonAdvicedScreen = ({
    reasonOfAdvice,
    onChooseReason,
}) => {
    return (
        <>
                  <div className="advice__background"></div>
                  <div className="advice__window">
                    {reasonOfAdvice.map((reason) => (
                      <>
                        <button
                          className="advice__button"
                          onClick={() => onChooseReason(reason)}
                        >
                          {reason}
                        </button>
                      </>
                    ))}
                  </div>
                </>
    )
}