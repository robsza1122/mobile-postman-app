type AdvicedButtonsType = {
    showOffice: boolean;
    placeOfAdvice: string[];
    onChooseOffice: (reason: string) => void;
    showNotifiedPlace: boolean;
    placeOfNotification: string[];
    onChooseNotificationPlace: (reason: string) => void;
}

export const AdvicedButtons = ({
  showOffice,
  placeOfAdvice,
  onChooseOffice,
  showNotifiedPlace,
  placeOfNotification,
  onChooseNotificationPlace,
}: AdvicedButtonsType) => {
  return (
    <>
      {showOffice && (
        <>
          <div className="advice__background"></div>
          <div className="advice__window">
            {placeOfAdvice.map((reason) => (
              <>
                <button
                  className="advice__button"
                  onClick={() => onChooseOffice(reason)}
                >
                  {reason}
                </button>
              </>
            ))}
          </div>
        </>
      )}
      {showNotifiedPlace && (
        <>
          <div className="advice__background"></div>
          <div className="advice__window">
            {placeOfNotification.map((reason) => (
              <>
                <button
                  className="advice__button"
                  onClick={() => onChooseNotificationPlace(reason)}
                >
                  {reason}
                </button>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};
