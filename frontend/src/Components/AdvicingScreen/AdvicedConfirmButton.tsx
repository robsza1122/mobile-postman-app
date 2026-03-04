type AdvicedConfirmButtonType = {
    handleConfirmButton: () => void;
}

export const AdvicedConfirmButton = ({ handleConfirmButton }: AdvicedConfirmButtonType) => {
  return (
    <div className="advice__confirmcontent">
      <button
        className="advice__confirmbutton"
        onClick={() => handleConfirmButton()}
      >
        Confirm
      </button>
    </div>
  );
};
