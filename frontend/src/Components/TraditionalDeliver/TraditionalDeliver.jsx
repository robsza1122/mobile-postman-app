import { useContext, useEffect, useState } from "react";
import "./TraditionalDeliver.scss";
import { PostManState } from "../../PostGlobalProvider";
import { useNavigate } from "react-router-dom";
import { subjectsOption } from "../../utils/DataProvider";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { PARCELS } from "../../hooks/useParcels";
import { date } from "../../utils/currentDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDeliveredStatus } from "../../api/api";
import useParcels from "../../hooks/useParcels";
import { Loading } from "../../Loading/Loading.jsx";
import { TDSubjectWindow } from "./TDSubjectWindow.jsx";
import { TDParticularWindow } from "./TDParticularWindow.jsx";
import { TDList } from "./TDList.jsx";
import { TDSubjectOfDelivery } from "./TDSubjectOfDelivery.jsx";
import { TDInputs } from "./TDInputs.jsx";
import { TDNoAddresseeDelivery } from "./TDNoAddresseeDelivery.jsx";
import { TDButtons } from "./TDButtons.jsx";

export const TraditionalDeliver = () => {
  const {
    downloadedParcels,
    setDownloadedParcels,
    currentUser,
    handleSignatureButton,
    chooseSubject,
    setChooseSubject,
    input,
    setInput,
    savePoints,
    setSavePoints,
    particularSubject,
    setParticularSubject,
  } = useContext(PostManState);
  const { parcels } = useParcels();
  const queryClient = useQueryClient();
  const findParcel = downloadedParcels.filter((parcel) => parcel.isMarked);

  const navigate = useNavigate();

  const [openList, setOpenList] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [choosen, setChoosen] = useState("");
  const [addresseesData, setAddresseesData] = useState(false);
  const [noAddressee, setNoAddressee] = useState(false);
  const [showParticularSubject, setShowParticularSubject] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate: changeStatus } = useMutation({
    mutationFn: addDeliveredStatus,
    mutationKey: [PARCELS],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData([PARCELS]);

      queryClient.setQueryData([PARCELS], (old) => [...old, updatedParcel]);

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });
  const handleList = () => {
    setOpenList(!openList);
  };
  useEffect(() => {
    const handlePop = () => {
      const marked = (downloadedParcels || []).filter((p) => p.isMarked);
      if (!marked || marked.length === 0) {
        navigate("/deliverOption");
      } else {
        navigate("/workPage");
      }
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handlePop);

    return () => {
      window.removeEventListener("popstate", handlePop);
    };
  }, [downloadedParcels, navigate]);

  const handleConfirmButton = () => {
    if (
      findParcel[0].noAddressee &&
      particularSubject === "Parcel left in place set with addressee" &&
      input === ""
    ) {
      alert("Type particular info delivery");

      return;
    }
    if (
      findParcel[0].noAddressee &&
      particularSubject !== "Parcel left in place set with addressee" &&
      input === ""
    ) {
      alert("Type name and surname delivery's subject");

      return;
    }
    if (!findParcel[0].noAddressee && input === "") {
      alert("Type name and surname delivery's subject");

      return;
    }
    if (savePoints && !findParcel[0].noAddressee) {
      changeStatus({
        nameOfStatus: "DELIVERED",
        id: findParcel[0]._id,
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
        numberOfBook: findParcel[0].numberOfBook,
        isDownloaded: true,
        username: findParcel[0].forUser,
        createdAt: date,
      });
      setDownloadedParcels(
        downloadedParcels.map((parcel) => {
          if (findParcel[0]._id === parcel._id) {
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
      navigate("/statusHandler");
      setInput("");
      setSavePoints(null);
    } else if (findParcel[0].noAddressee) {
      changeStatus({
        nameOfStatus: "DELIVERED",
        id: findParcel[0]._id,
        subject: chooseSubject,
        details: particularSubject,
        signature: savePoints,
        isDeliveryCode: false,
        isSignature: true,
        noAddressee: true,
        deliveryInput:
          particularSubject === "Parcel left in place set with addressee"
            ? input
            : "",
        reasonOfAdvice: "",
        officeOfAdvice: "",
        placeOfNotification: "",
        isBooked: true,
        numberOfBook: findParcel[0].numberOfBook,
        username: findParcel[0].forUser,
        createdAt: date,
        isDownloaded: true,
      });
      setDownloadedParcels(
        downloadedParcels.map((parcel) => {
          if (findParcel[0]._id === parcel._id) {
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
      navigate("/statusHandler");
      setInput("");
    } else if (!savePoints) {
      alert("Please do signature");
    }
  };

  console.log(currentUser);
  console.log(input);
  console.log(showParticularSubject);
  console.log(downloadedParcels);
  console.log(chooseSubject);
  console.log(parcels);
  console.log(particularSubject);
  console.log(findParcel[0].noAddressee);
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
          <TDSubjectWindow
            showSubjects={showSubjects}
            subjectsOption={subjectsOption}
            markedParcel={findParcel[0]}
            setShowSubjects={setShowSubjects}
            setChooseSubject={setChooseSubject}
            setChoosen={setChoosen}
            choosen={choosen}
            setAddresseesData={setAddresseesData}
            setInput={setInput}
          />
        )}

        {showParticularSubject && (
          <TDParticularWindow
            showSubjects={showSubjects}
            setInput={setInput}
            input={input}
            markedParcel={findParcel[0]}
            chooseSubject={chooseSubject}
            addresseesData={addresseesData}
            particularSubject={particularSubject}
            setChoosen={setChoosen}
            choosen={choosen}
            setShowParticularSubject={setShowParticularSubject}
            setParticularSubject={setParticularSubject}
          />
        )}
        <nav className="td__nav">
          <p className="td__info">DELIVER WITH SIGNATURE</p>
          <p className="td__user">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
        </nav>
        <TDList
          findParcel={findParcel}
          openList={openList}
          handleList={handleList}
        />

        <TDSubjectOfDelivery
          setShowSubjects={setShowSubjects}
          openList={openList}
          markedParcel={findParcel[0]}
          chooseSubject={chooseSubject}
        />
        <p className="td__receivingperson">Name and surname receiving person</p>
        <TDInputs
          markedParcel={findParcel[0]}
          setInput={setInput}
          input={input}
          chooseSubject={chooseSubject}
          setAddresseesData={setAddresseesData}
          addresseesData={addresseesData}
          particularSubject={particularSubject}
        />
        <div className="td__signcontent">
          <TDNoAddresseeDelivery
            markedParcel={findParcel[0]}
            setShowParticularSubject={setShowParticularSubject}
            particularSubject={particularSubject}
            setNoAddressee={setNoAddressee}
            noAddressee={noAddressee}
            setInput={setInput}
          />
        </div>
        <TDButtons
          markParcel={findParcel[0]}
          input={input}
          particularSubject={particularSubject}
          savePoints={savePoints}
          handleSignatureButton={handleSignatureButton}
        />
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
