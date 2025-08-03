import classnames from "classnames";
import { Link } from "react-router-dom";


export const TrailButtons = ({
    openBook,
    showError,
    verifyBook,
    markedBook,
    onSubmit,
    onReset,
        }) => {
    return (
                  <div className="trail__buttons">
                    <Link
                      className={classnames("trail__button", {
                        "trail__button-opacity": openBook || showError,
                      })}
                      onClick={() => onSubmit()}
                      to={verifyBook && markedBook ? "/booklist" : ""}
                    >
                      <p className="trail__buttontext">Accept Book</p>
                      <img
                        src="src/image/circle-check.svg"
                        alt=""
                        className="trail__img"
                      />
                    </Link>
                    <Link
                      className={classnames("trail__button", {
                        "trail__button-opacity": openBook || showError,
                      })}
                      onClick={() => onReset()}
                    >
                      <p className="trail__buttontext">Decline Book</p>
                      <img
                        src="src/image/circle-cross.svg"
                        alt=""
                        className="trail__img"
                      />
                    </Link>
                  </div>
    )
}