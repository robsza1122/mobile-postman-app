type OtherOptionButtonProps = {
    handleConfirmButton: () => void
}

export const OtherOptionButton = ({handleConfirmButton}: OtherOptionButtonProps) => {
    return (
        <div className="advice__confirmcontent">
          <button
            className="advice__confirmbutton"
            onClick={() => handleConfirmButton()}
          >
            Confirm
          </button>
        </div>
    )
}