export const AdvicedButtons = ({
  showOffice,
  placeOfAdvice,
  onChooseOffice,
  showNotifiedPlace,
  placeOfNotification,
  onChooseNotificationPlace,
}) => {
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
