export const OtherOptionButton = ({handleConfirmButton}) => {
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