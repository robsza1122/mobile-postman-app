type OtherOptionButtonsProps = {
  onResult: () => void,
  onDetails: () => void,
  chooseResult: string,
  chooseDetails: string
}

export const OtherOptionButtons = ({
  onResult,
  onDetails,
  chooseResult,
  chooseDetails,
}: OtherOptionButtonsProps) => {
  return (
    <>
      <p className="advice__text">Result of Delivery:</p>
      <button className="advice__selecttext" onClick={() => onResult()}>
        {chooseResult}
      </button>
      <p className="advice__text">Details of delivery:</p>
      <button className="advice__selecttext" onClick={() => onDetails()}>
        {chooseDetails}
      </button>
    </>
  );
};
