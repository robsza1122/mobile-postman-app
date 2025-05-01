import "./TrailOption.scss";
import useParcels from "../../hooks/useParcels";
import { useContext, useState } from "react";
import { Loading } from "../../Loading/Loading.jsx";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { PostManState } from "../../PostGlobalProvider.jsx";
import { useMutation } from "@tanstack/react-query";
import { assignParcelsToUser, getInDeliveryStatus, sendInDeliveryEmail, updateAllStatus } from "../../api/api.js";
import useAuth from "../../hooks/useAuth.js";
import { date } from "../../utils/currentDate.js";

export const TrailOption = () => {
  const {
    downloadedBook,
    setDownloadedBook,
    clearBook,
    currentUser,
    deliveryBooks,
    parcelsInDatabase,
    setDayIsFinished,
  } = useContext(PostManState);
  const { user } = useAuth();
  const [parcelsNumber, setParcelsNumber] = useState("");
  const [openBook, setOpenBook] = useState(false);
  const [showError, setShowError] = useState(false);
  const { parcels, isLoading } = useParcels();
  const [loading, setLoading] = useState(false);
  const [errorText, setLoadingText] = useState("");
  const [verifyBook, setVerifyBook] = useState(false);
  const [markedBook, setMarkedBook] = useState(false);
  const { mutate: updateStatus } = useMutation({
    mutationFn: updateAllStatus,
  });
  const {mutate: assignParcels} = useMutation({
    mutationFn: assignParcelsToUser,
  })

  const onSubmit = () => {
    const typedParcel = parcelsInDatabase.find(
      (parcel) => parcel.numberOfParcel === parcelsNumber
    );
    const typedParcelBookNumber = parcelsInDatabase.find(
      (parcel) => parcel.numberOfParcel === parcelsNumber
    ).numberOfBook;

    const downloadedParcels = parcelsInDatabase.filter(
      (parcel) => parcel.numberOfBook === typedParcelBookNumber
    );

    console.log(typedParcelBookNumber);

    setLoading(true);
    setLoadingText("Looking for books...");
    setTimeout(() => {
      setLoading(false);
      setLoadingText("");
    }, 1000);

    if (markedBook && verifyBook) {
      const downloadedParcelsWithEmail = downloadedParcels.map((parcel) => {
        const inDeliveryStatus = {
              name: "IN DELIVERY",
              createdAt: date,
              subject: "",
              details: "",
              signature: "",
              isSignature: false,
              noAddressee: false,
              deliveryInput: "",
              reasonOfAdvice: "",
              officeOfAdvice: "",
              placeOfNotification: "",
            };
        sendInDeliveryEmail(parcel._id);
        return {
          ...parcel,
          forUser: currentUser.username,
          status: [
            ...parcel.status,
            inDeliveryStatus,
          ]
        };
      });
      setDayIsFinished(false);
      setDownloadedBook([...downloadedBook, ...downloadedParcelsWithEmail]);
      updateStatus({
        numberOfBook: typedParcelBookNumber,
        username: currentUser.username,
      });
      setLoading(true);
      setLoadingText("downloading book...");
      setTimeout(() => {
        setLoading(false);
        setLoadingText("");
      }, 1000);
    };

    if (typedParcel.forUser === "") {
      alert("Parcel is not assigned to any user");
      setParcelsNumber('');

      return;
    }

    if (typedParcel.forUser !== currentUser.username) {
      alert("Parcel is assigned to other user");
      setParcelsNumber('');

      return;
    }



    if (
      downloadedBook.filter(
        (parcel) => parcel.numberOfBook === typedParcelBookNumber
      ).length !== 0
    ) {
      alert("Book is already downloaded");
      setParcelsNumber("");

      return;
    }

    if (verifyBook && !markedBook) {
      alert("No book is choosen.");
      return;
    }

    if (
      parcelsInDatabase.find(
        (parcel) => parcel.numberOfParcel === parcelsNumber && !parcel.isBooked
      )
    ) {
      alert("Parcel is not added to any book.");
      setParcelsNumber("");

      return;
    }

    if (
      parcelsInDatabase.filter(
        (parcel) => parcel.numberOfParcel !== parcelsNumber
      ).length === parcelsInDatabase.length
    ) {
      alert("Wrong number of parcel");
      setParcelsNumber("");

      return;
    }

    if (
      parcelsInDatabase.find(
        (parcel) => parcel.numberOfParcel === parcelsNumber && parcel.isBooked
      )
    ) {
      setOpenBook(true);
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
    setDownloadedBook([]);
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
    setLoadingText("downloading book...");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    setVerifyBook(true);
    setOpenBook(false);
  };

  console.log(downloadedBook);
  console.log(user);
  console.log(verifyBook);
  console.log(markedBook);
  console.log(parcelsInDatabase);
  console.log(deliveryBooks);

  return (
    <>
      <div className="trail__body">
        <nav className="trail__nav">
          <div className="trail__navcontent">
            <div className="trail__navinfos">
              <p className="trail__navtext">DOWNLOAD BOOK</p>
              <p className="trail__userinfo">{`${currentUser.username} [90${currentUser.EMINumber}]`}</p>
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
              onChange={(e) => setParcelsNumber(e.target.value)}
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
          <button onClick={() => clearBook()}>Clear book</button>
          <Link to="/createBook" className="trail__createbook">
            Add parcels to book
          </Link>
          {verifyBook && (
            <div className="trail__verifywindow">
              <div className="trail__verifyinfos">
                <p className="trail__verifyinfo">
                  EMInumber of courier: {currentUser.EMINumber}{" "}
                </p>
                <p className="trail__verifyinfo">
                  Amount of parcel to deliver: {downloadedBook.length}/
                  {parcels.length}
                </p>
                <p className="trail__verifyinfo">
                  parcels to deliver to ZDO: 0
                </p>
                <p className="trail__verifyinfo">
                  parcels with Pocztex Procedure: 0
                </p>
                <p className="trail__verifyinfo">
                  parcels with limited responsiblity: 0
                </p>
              </div>
              <input
                type="checkbox"
                className="trail__checkbox"
                onClick={() => setMarkedBook(!markedBook)}
                checked={markedBook}
              />
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
                    Delivery Book{" "}
                    {
                      parcelsInDatabase.find(
                        (parcel) => parcel.numberOfParcel === parcelsNumber
                      ).numberOfBook
                    }
                  </p>
                </div>
                <div className="trail__infocontent trail__infocontent-confirm">
                  <div className="trail__infos">
                    <p className="trail__info">
                      Delivery book with number {parcelsNumber} was found:
                    </p>
                    <p className="trail__info">
                      Number of parcel in this book:{" "}
                      {
                        deliveryBooks.find(
                          (book) =>
                            book.number ===
                            parcelsInDatabase.find(
                              (parcel) =>
                                parcel.numberOfParcel === parcelsNumber
                            ).numberOfBook
                        ).parcels.length
                      }
                    </p>
                    <p className="trail__info">
                      Do you want to download delivery book?
                    </p>
                  </div>
                  <div className="trail__confirmedbuttons">
                    <button
                      className="trail__confirmedbutton trail__confirmedbuttonYES"
                      onClick={() => onConfirmationSuccess()}
                    >
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
