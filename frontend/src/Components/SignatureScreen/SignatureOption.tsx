import classNames from "classnames"

type SignatureOptionsProps = {
    savePoints: boolean,
    clearSignature: () => void,
    saveSignature: () => void
}

export const SignatureOptions = ({
    savePoints,
    clearSignature,
    saveSignature
}: SignatureOptionsProps) => {
    return (
                <div className="sign__options">
                  <button
                    className={classNames("sign__button", {
                      "sign__button--disabled": !savePoints,
                    })}
                    onClick={() => clearSignature()}
                  >
                    Clear
                  </button>
                  <div className="sign__signinfo">
                    Write your signature into the white square below.
                  </div>
                  <button
                    className={classNames("sign__button", {
                      "sign__button--disabled": !savePoints,
                    })}
                    onClick={() => saveSignature()}
                  >
                    Accept
                  </button>
                </div>
    )
}