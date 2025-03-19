import useAuth from "../../hooks/useAuth";
import "./TrailOption.scss";
import useParcels from "../../hooks/useParcels";
import { useContext, useState } from "react";
import { Loading } from "../../Loading/Loading.jsx";
import classnames from "classnames";
import {Link} from "react-router-dom";
import { PostManState } from "../../PostGlobalProvider.jsx";
import { date } from "../../utils/currentDate.js";

export const TrailOption = () => {
  const {downloadedBook, setDownloadedBook} = useContext(PostManState);
  const [parcelsNumber, setParcelsNumber] = useState("");
  const [openBook, setOpenBook] = useState(false);
  const [showError, setShowError] = useState(false);
  const { parcels, isLoading } = useParcels();
  const [loading, setLoading] = useState(false);
  const [errorText, setLoadingText] = useState("");
  const [verifyBook, setVerifyBook] = useState(false);
  const [markedBook, setMarkedBook] = useState(false);
  const { user } = useAuth();
  console.log(downloadedBook);
  console.log(verifyBook);
  console.log(markedBook);
  const onSubmit = () => {
    setLoading(true);
    setLoadingText("Looking for books...");
    setTimeout(() => {
      setLoading(false);
      setLoadingText("");
    }, 1000);

    if (verifyBook && markedBook) {
      setLoading(true);
      setLoadingText("downloading book...");
      setTimeout(() => {
        setLoading(false);
        setLoadingText('');
      }, 1000);

    }

    
    if (verifyBook && !markedBook) {
      alert("No book is choosen.");
      return;
    }

    if (parcels.find((parcel) => parcel.numberOfParcel === parcelsNumber)) {
      setOpenBook(true);
    } else if (parcelsNumber.trim() === "") {
      alert("Wrong identificator parcel");
    } else {
      setShowError(true);
    }
  };

  const onReset = () => {
    if (verifyBook) {
      setLoading(true);
      setLoadingText("Removing book...");
      setTimeout(() => {
        setLoading(false);
        setLoadingText("");
      }, 1000);
      setOpenBook(false);
      setVerifyBook(false);
      setMarkedBook(false);
      setParcelsNumber("");
    }
    setOpenBook(false);
    setParcelsNumber("");
  };

  const onConfirmationFalse = () => {
    setLoadingText("Loading books...");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoadingText("");
    }, 1000);
  };

  const onConfirmationSuccess = () => {
    const changeStatus = parcels.map(parcel => {
        return {
          
          ...parcel,
          status: [
            ...parcel.status,
            {
              name: "IN DELIVERY",
              createdAt: date,
            }
          ]
          
        }
      }
    )
 
    setLoadingText("downloading book...");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    setVerifyBook(true);
    setDownloadedBook(changeStatus);
    setOpenBook(false);
  };

  console.log(downloadedBook);

  return (
    <>
      <div className="trail__body">
        <nav className="trail__nav">
          <div className="trail__navcontent">
            <div className="trail__navinfos">
              <p className="trail__navtext">DOWNLOAD BOOK</p>
              <p className="trail__userinfo">{`${user.username} [90${user.EMINumber}]`}</p>
            </div>
            <div className="trail__icons">
              <div className="trail__icondownload">
                <img
                  className="trail__barcode"
                  src="src/image/barcode.svg"
                  alt="barcode"
                />
                <img
                  src="src/image/magni-glass-white.svg"
                  alt=""
                  className="trail__magniglass"
                />
              </div>
              <div className="trail__iconbarcode">
                <img
                  className="trail__code"
                  src="src/image/code-white.svg"
                  alt=""
                />
                <img
                  src="src/image/magni-glass-white.svg"
                  alt=""
                  className="trail__magniglasscode"
                />
              </div>
              <div className="trail__dots">
                <div className="trail__dot"></div>
                <div className="trail__dot"></div>
                <div className="trail__dot"></div>
              </div>
            </div>
          </div>
          <div></div>
        </nav>
        {isLoading && <Loading message="Loading parcels..." />}

        <div className="trail__content">
          <div className="trail__inputkeyboard">
            <input
              type="text"
              className="trail__input"
              placeholder="Parcel's number..."
              value={parcelsNumber}
              onChange={(e) => 
                setParcelsNumber(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSubmit();
                  }
                }}
            />
            <img
              src="src/image/keyboard.svg"
              alt=""
              className="trail__keyboard"
            />
          </div>
          <button onClick={() => {
            setDownloadedBook([]);
            localStorage.clear();
          }}>Clear book</button>
          {verifyBook && (
          <div className="trail__verifywindow">
            <div className="trail__verifyinfos">
            <p className="trail__verifyinfo">EMInumber of courier: {user.EMINumber} </p>
            <p className="trail__verifyinfo">Amount of parcel to deliver: {downloadedBook.length}/{parcels.length}</p>
            <p className="trail__verifyinfo">parcels to deliver to ZDO: 0</p>
            <p className="trail__verifyinfo">parcels with Pocztex Procedure: 0</p>
            <p className="trail__verifyinfo">parcels with limited responsiblity: 0</p>
            </div>
            <input
             type="checkbox" 
             className="trail__checkbox"
             onClick={() => setMarkedBook(!markedBook)}
              checked={markedBook} />
          </div>
        )}
          {!openBook && !verifyBook && (
          <>
            <p className="trail__noposition">No positions</p>
            <div className="trail__line"></div>
          </>
        )}
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
        </div>
        <>
          {!loading && openBook && (
            <>
              <div className="trail__confirmBook"></div>
              <div className="trail__confirmwindow">
                <div className="trail__redblock">
                  <p className="trail__downloaderror">
                    Delivery Book {parcelsNumber}
                  </p>
                </div>
                <div className="trail__infocontent trail__infocontent-confirm">
                  <div className="trail__infos">
                    <p className="trail__info">
                      Delivery book with number {parcelsNumber} was found:
                    </p>
                    <p className="trail__info">
                      Number of parcel in this book: {parcels.length}
                    </p>
                    <p className="trail__info">
                      Do you want to download delivery book?
                    </p>
                  </div>
                  <div className="trail__confirmedbuttons">
                    <button className="trail__confirmedbutton trail__confirmedbuttonYES"
                    onClick={() => onConfirmationSuccess()}>
                      Yes
                    </button>
                    <button
                      className="trail__confirmedbutton trail__confirmedbuttonNO"
                      onClick={() => {
                        setOpenBook(false);
                        setParcelsNumber("");
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
        {loading && (
          <>
            <div className="trail__confirmBook"></div>
            <Loading message={errorText} />
          </>
        )}
        {showError && !loading && (
          <>
            <div className="trail__confirmBook"></div>
            <div className="trail__confirmwindow">
              <div className="trail__redblock">
                <p className="trail__downloaderror">Download Error</p>
              </div>
              <div className="trail__infocontent">
                <div className="trail__infos">
                  <p className="trail__info">
                    Some problem with downloading parcels occured:
                  </p>
                  <p className="trail__info">{parcelsNumber}</p>
                  <p className="trail__info">
                    Reason: Cannot find book to download: ({parcelsNumber})
                  </p>
                  <p className="trail__info">Do you want to try again?</p>
                </div>
                <div className="trail__confirmedbuttons">
                  <button
                    className="trail__confirmedbutton trail__confirmedbuttonYES"
                    onClick={() => onConfirmationFalse()}
                  >
                    Yes
                  </button>
                  <button
                    className="trail__confirmedbutton trail__confirmedbuttonNO"
                    onClick={() => {
                      setShowError(false);
                      setParcelsNumber("");
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
