import { useContext, useEffect, useState } from "react";
import "./TraditionalDeliver.scss";
import { PostManState } from "../../PostGlobalProvider";
import { useNavigate } from "react-router-dom";
import {
  particularDeliveryInfo,
  reasonOfAdvice,
  subjectsOption,
} from "../../utils/DataProvider";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { date } from "../../utils/currentDate";
import { useMutation } from "@tanstack/react-query";
import { addDeliveredStatus } from "../../api/api";
import useParcels from "../../hooks/useParcels";
import { Loading } from "../../Loading/Loading.jsx";

export const TraditionalDeliver = () => {
  const {
    currentParcels,
    setCurrentParcels,
    downloadedBook,
    setDownloadedBook,
    currentUser,
    handleSignatureButton,
    chooseSubject,
    setChooseSubject,
    input,
    setInput,
    savePoints,
    particularSubject,
    setParticularSubject,
  } = useContext(PostManState);
  const { parcels } = useParcels();
  const findParcel = downloadedBook.find(
    (parcel) => parcel._id === currentParcels[0]._id,
  );

  const navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = () => {
      navigate("/ML");
      setInput("");
      window.location.reload();
    };
  });
  const [openList, setOpenList] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [choosen, setChoosen] = useState("");
  const [addresseesData, setAddresseesData] = useState(false);
  const [showParticularSubject, setShowParticularSubject] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate: changeStatus } = useMutation({
    mutationFn: addDeliveredStatus,
    mutationKey: ["parcels"],
    onSuccess: () => {
      window.location.reload();
    },
  });
  const handleList = () => {
    setOpenList(!openList);
  };
  useEffect(() => {
    window.onpopstate = () => {
      if (currentParcels.length === 0) {
        window.location.reload();
      }
      setDownloadedBook(
        downloadedBook.map((parcel) => {
          if (parcel.isMarked) {
            return {
              ...parcel,
              deliveryInput: "",
              isMarked: false,
            };
          }

          return parcel;
        }),
      );
      if (currentParcels[0].amountOfTrials === 3) {
        navigate("/deliverOption");
      }
    };
  }, []);

  const handleConfirmButton = () => {
    if (
      currentParcels[0].noAddressee &&
      particularSubject === "Parcel left in place set with addressee" &&
      input === ""
    ) {
      alert("Type particular info delivery");

      return;
    }
    if (
      currentParcels[0].noAddressee &&
      particularSubject !== "Parcel left in place set with addressee" &&
      input === ""
    ) {
      alert("Type name and surname delivery's subject");

      return;
    }
    if (!currentParcels[0].noAddressee && input === "") {
      alert("Type name and surname delivery's subject");

      return;
    }
    if (
      findParcel.isSignature &&
      findParcel.signature &&
      !currentParcels[0].noAddressee
    ) {
      changeStatus({
        nameOfStatus: "DELIVERED",
        id: findParcel._id,
        subject: chooseSubject,
        details: "",
        signature: savePoints,
        isDeliveryCode: false,
        isSignature: true,
        noAddressee: false,
        deliveryInput: input.toString(),
        reasonOfAdvice: "",
        officeOfAdvice: "",
        placeOfNotification: "",
        isBooked: true,
        numberOfBook: findParcel.numberOfBook,
        isDownloaded: true,
        username: findParcel.forUser,
        createdAt: date,
      });
      setDownloadedBook(
        downloadedBook.map((parcel) => {
          if (findParcel._id === parcel._id) {
            return {
              ...parcel,
              isMarked: false,
              status: [
                ...parcel.status,
                {
                  name: "DELIVERED",
                  createdAt: date,
                  subject: chooseSubject,
                  details: particularSubject,
                  noAddressee: false,
                  deliveryInput:
                    particularSubject ===
                    "Parcel left in place set with addressee"
                      ? input
                      : "",
                },
              ],
            };
          }

          return parcel;
        }),
      );
      navigate("/deliverOption");
      setCurrentParcels([]);
      setInput("");
    } else if (
      findParcel.isSignature &&
      findParcel.signature &&
      currentParcels[0].noAddressee
    ) {
      changeStatus({
        id: findParcel._id,
        subject: chooseSubject,
        details: particularSubject,
        nameOfStatus: "DELIVERED",
        signature: savePoints,
        isDeliveryCode: false,
        isSignature: true,
        noAddressee: true,
        deliveryInput:
          particularSubject === "Parcel left in place set with addressee"
            ? input.toString()
            : "",
        reasonOfAdvice: "",
        officeOfAdvice: "",
        placeOfNotification: "",
        isBooked: true,
        numberOfBook: findParcel.numberOfBook,
        username: findParcel.forUser,
        createdAt: date,
        isDownloaded: true,
      });
      setDownloadedBook(
        downloadedBook.map((parcel) => {
          if (findParcel._id === parcel._id) {
            return {
              ...parcel,
              isMarked: false,
              status: [
                ...parcel.status,
                {
                  name: "DELIVERED",
                  createdAt: date,
                  subject: chooseSubject,
                  details: particularSubject,
                  noAddressee: true,
                  deliveryInput:
                    particularSubject ===
                    "Parcel left in place set with addressee"
                      ? input
                      : "",
                },
              ],
            };
          }

          return parcel;
        }),
      );
      setCurrentParcels([]);
      navigate("/deliverOption");
      setInput("");
    } else if (!findParcel.isSignature) {
      alert("Please do signature");
    }
  };

  console.log(currentUser);
  console.log(findParcel);
  console.log(input);
  console.log(showParticularSubject);
  console.log(downloadedBook);
  console.log(chooseSubject);
  console.log(addresseesData);
  console.log(parcels);
  console.log(currentParcels[0].noAddressee);
  console.log(particularSubject);
  return (
    <>
      {loading && (
        <>
          <div className="trail__confirmBook"></div>
          <Loading message={loadingText} />
        </>
      )}
      <div className="td__content">
        {showSubjects && (
          <>
            <div
              className="td__background"
              onClick={() => showSubjects(false)}
            ></div>
            <div className="td__window">
              {subjectsOption.map((subject, id) => {
                const handleButtonSubject = () => {
                  setDownloadedBook(
                    downloadedBook.map((parcel) => {
                      if (parcel._id === currentParcels[0]._id) {
                        return {
                          ...parcel,
                          isSignature: false,
                          signature: null,
                        };
                      }

                      return parcel;
                    }),
                  );

                  setInput(
                    `${
                      subject === "Addressee"
                        ? `${currentParcels[0].name} ${currentParcels[0].surname}`
                        : ""
                    }`,
                  );
                  setAddresseesData(subject === "Addressee" ? true : false);
                  setShowSubjects(false);
                  setChooseSubject(subject);
                };
                console.log(id);
                return (
                  <button
                    className="td__subjectposition"
                    onMouseDown={() => setChoosen(subject)}
                    onMouseUp={() => setChoosen("")}
                    onClick={() => handleButtonSubject()}
                    style={{
                      backgroundColor: `${
                        choosen === subject ? "lightgray" : "white"
                      }`,
                    }}
                    key={id}
                  >
                    {subject}
                  </button>
                );
              })}
            </div>
          </>
        )}
        {showParticularSubject && (
          <>
            <div
              className="td__background"
              onClick={() => showSubjects(false)}
            ></div>
            <div className="td__window">
              {particularDeliveryInfo.map((subject, id) => {
                const handleButtonSubject = () => {
                  setInput(
                    `${
                      chooseSubject === "Addressee" && !addresseesData
                        ? `${currentParcels[0].name} ${currentParcels[0].surname}`
                        : ""
                    }`,
                  );
                  setDownloadedBook(
                    downloadedBook.map((parcel) => {
                      if (parcel._id === currentParcels[0]._id) {
                        return {
                          ...parcel,
                          isSignature: false,
                          signature: null,
                        };
                      }

                      return parcel;
                    }),
                  );
                  if (currentParcels[0].noAddressee) {
                    setInput(
                      particularSubject ===
                        "Parcel left in place set with addressee"
                        ? ""
                        : input,
                    );
                  }
                  if (
                    particularSubject ===
                    "Parcel left in place set with addressee"
                  ) {
                    setInput("");
                  }
                  setShowParticularSubject(false);
                  setParticularSubject(subject);
                };
                console.log(id);
                return (
                  <button
                    className="td__subjectposition"
                    onMouseDown={() => setChoosen(subject)}
                    onMouseUp={() => setChoosen("")}
                    onClick={() => handleButtonSubject()}
                    style={{
                      backgroundColor: `${
                        choosen === subject ? "lightgray" : "white"
                      }`,
                    }}
                    key={id}
                  >
                    {subject}
                  </button>
                );
              })}
            </div>
          </>
        )}
        <nav className="td__nav">
          <p className="td__info">DELIVER WITH SIGNATURE</p>
          <p className="td__user">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
        </nav>
        <div className="td__list">
          {currentParcels.map((parcel) => {
            return (
              <>
                <button
                  className="td__listcontent"
                  key={parcel._id}
                  onClick={() => handleList()}
                >
                  <p
                    className="td__listarrow"
                    style={{
                      transform: `${openList ? "rotate(0.25turn)" : ""}`,
                    }}
                  >
                    {">"}
                  </p>
                  <p className="td__listposition">{parcel.numberOfParcel}</p>
                </button>
                {openList && (
                  <div className="td__listinfocontent">
                    <div className="td__infocontent">
                      <p className="td__infotext">Cash On Delivery:</p>
                      <div className="td__datacontent">
                        <img
                          src="src/image/coins.svg"
                          alt=""
                          className="td__infoimage"
                        />
                        <p className="td__infodata">{parcel.amount}</p>
                      </div>
                    </div>
                    <div className="td__infocontent">
                      <p className="td__infotext">Weight:</p>
                      <div className="td__datacontent">
                        <img
                          src="src/image/weight.svg"
                          alt=""
                          className="td__infoimage"
                        />
                        <p className="td__infodata">2.00</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        <div
          className={classNames("td__deliverycontent", {
            "td__deliverycontent--opened-list": openList,
          })}
        >
          <p className="td__subject">Subject Of Delivery:</p>
          <button
            className="td__subjectcontent"
            onClick={() => {
              setShowSubjects(true);
              setDownloadedBook(
                downloadedBook.map((parcel) => {
                  if (parcel._id === currentParcels[0]._id) {
                    return {
                      ...parcel,
                      isSignature: false,
                      signature: null,
                    };
                  }

                  return parcel;
                }),
              );
            }}
            disabled={currentParcels[0].noAddressee}
          >
            {`${
              currentParcels[0].noAddressee
                ? "Person authorized to receive parcel"
                : chooseSubject
            }`}
          </button>
        </div>
        <p className="td__receivingperson">Name and surname receiving person</p>
        <div className="td__inputs">
          {!currentParcels[0].noAddressee && (
            <>
              <input
                type="text"
                className="td__input"
                defaultValue={`${currentParcels[0].name} ${currentParcels[0].surname}`}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setDownloadedBook(
                    downloadedBook.map((parcel) => {
                      if (parcel._id === currentParcels[0]._id) {
                        return {
                          ...parcel,
                          isSignature: false,
                          signature: null,
                        };
                      }

                      return parcel;
                    }),
                  );
                }}
                placeholder="Write name and surname"
              />
              <div className="td__inputcontent">
                <p className="td__inputinfo">Copy from addressee's data</p>
                <input
                  type="checkbox"
                  className="td__checkbox"
                  value={addresseesData ? true : false}
                  disabled={chooseSubject !== "Addressee"}
                  onClick={() => {
                    if (chooseSubject === "Addressee") {
                      setInput(
                        `${currentParcels[0].name} ${currentParcels[0].surname}`,
                      );
                    }
                    setAddresseesData(!addresseesData);
                    setInput(
                      addresseesData && chooseSubject === "Addressee"
                        ? `${currentParcels[0].name} ${currentParcels[0].surname}`
                        : "",
                    );
                    setDownloadedBook(
                      downloadedBook.map((parcel) => {
                        if (parcel._id === currentParcels[0]._id) {
                          return {
                            ...parcel,
                            deliveryInput: "",
                            isSignature: false,
                            signature: null,
                          };
                        }

                        return parcel;
                      }),
                    );
                  }}
                />
              </div>
            </>
          )}
          {currentParcels[0].noAddressee &&
            particularSubject === "Parcel left in place set with addressee" && (
              <input
                type="text"
                className="td__input"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setDownloadedBook(
                    downloadedBook.map((parcel) => {
                      if (parcel._id === currentParcels[0]._id) {
                        return {
                          ...parcel,
                          deliveryInput: "",
                          isSignature: false,
                          signature: null,
                        };
                      }

                      return parcel;
                    }),
                  );
                }}
                placeholder="Type place of delivery..."
                style={{
                  width: "100%",
                }}
              />
            )}
        </div>
        <div className="td__signcontent">
          {currentParcels[0].noAddressee && (
            <button
              className="td__particularcontent"
              style={{
                height: `${currentParcels[0].noAddressee && "35px"}`,
                width: "100%",
              }}
              onClick={() => {
                setShowParticularSubject(true);
                setDownloadedBook(
                  downloadedBook.map((parcel) => {
                    if (parcel._id === currentParcels[0]._id) {
                      return {
                        ...parcel,
                        isSignature: false,
                        signature: null,
                      };
                    }

                    return parcel;
                  }),
                );
              }}
            >
              {particularSubject}
            </button>
          )}
          <div className="td__signcontainer">
            <p className="td__signtext">Addressee's signature</p>
            <div className="td__crane">
              <button
                className="td__signbutton"
                onClick={() => {
                  setAddresseesData(false);
                  setDownloadedBook(
                    downloadedBook.map((parcel) => {
                      if (parcel._id === currentParcels[0]._id) {
                        return {
                          ...parcel,
                          noAddressee: !parcel.noAddressee,
                        };
                      }

                      return parcel;
                    }),
                  );
                  currentParcels[0].noAddressee =
                    !currentParcels[0].noAddressee;
                  setInput(
                    !currentParcels[0].noAddressee
                      ? `${currentParcels[0].name} ${currentParcels[0].surname}`
                      : "",
                  );
                }}
                style={{
                  transform: `translateX(${
                    currentParcels[0].noAddressee ? "45px" : "0"
                  })`,
                  transition: "0.3s ease transform",
                }}
              >
                {!currentParcels[0].noAddressee ? "YES" : "NO"}
              </button>
            </div>
          </div>
        </div>
        <div className="td__buttons">
          <Link
            to={findParcel.amountOfTrials === 3 ? "" : "/deliveryCodeScreen"}
            className={classNames("td__button", {
              "td__button--disabled": findParcel.amountOfTrials === 3,
            })}
            disabled={findParcel.amountOfTrials === 3}
          >
            Delivery code
          </Link>
          <Link
            className={classNames("td__button", {
              "td__button--is-signed": findParcel.isSignature,
            })}
            to={`${
              currentParcels[0].noAddressee
                ? input === "" &&
                  particularSubject ===
                    "Parcel left in place set with addressee"
                  ? ""
                  : "/signatureScreen"
                : `${input === "" ? "" : "/signatureScreen"}`
            }`}
            onClick={() => handleSignatureButton()}
          >
            Signature
          </Link>
        </div>
        <div className="td__confirmcontent">
          <button
            className="td__confirmbutton"
            onClick={() => handleConfirmButton()}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};
