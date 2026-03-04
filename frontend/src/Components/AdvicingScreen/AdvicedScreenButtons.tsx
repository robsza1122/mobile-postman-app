type AdvicedScreenButtonsType = {
    onReason: () => void;
    onOffice: () => void;
    onPlaceNotification: () => void;
    chooseReason: string;
    chooseOffice: string;
    chooseNotifiedPlace: string;
}

export const AdvicedScreenButtons = ({
  onReason,
  onOffice,
  onPlaceNotification,
  chooseReason,
  chooseOffice,
  chooseNotifiedPlace,
}: AdvicedScreenButtonsType) => {
  return (
    <>
      <p className="advice__text">Reason of advicing:</p>
      <button className="advice__selecttext" onClick={() => onReason()}>
        {chooseReason}
      </button>
      <p className="advice__text">Post Office:</p>
      <button className="advice__selecttext" onClick={() => onOffice()}>
        {chooseOffice}
      </button>
      <p className="advice__text">Place of leaving notification:</p>
      <button
        className="advice__selecttext"
        onClick={() => onPlaceNotification()}
      >
        {chooseNotifiedPlace}
      </button>
    </>
  );
};
