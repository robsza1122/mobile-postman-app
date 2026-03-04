type ShowReasonAdvicedScreenType = {
    reasonOfAdvice: string[];
    onChooseReason: (reason: string) => void;
}

export const ShowReasonAdvicedScreen = ({
    reasonOfAdvice,
    onChooseReason,
}: ShowReasonAdvicedScreenType) => {
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