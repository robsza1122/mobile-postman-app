import { useContext, useEffect, useState } from "react";
import "./TraditionalDeliver.scss";
import { PostManState } from "../../PostGlobalProvider.js";
import { useNavigate } from "react-router-dom";
import { subjectsOption } from "../../utils/DataProvider.js";
import { PARCELS } from "../../hooks/useParcels.js";
import { date } from "../../utils/currentDate.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDeliveredStatus, multiDeliveryStatus } from "../../api/api.js";
import useParcels from "../../hooks/useParcels.js";
import { TDSubjectWindow } from "./TDSubjectWindow.jsx";
import { TDParticularWindow } from "./TDParticularWindow.jsx";
import { TDList } from "./TDList.jsx";
import { TDSubjectOfDelivery } from "./TDSubjectOfDelivery.jsx";
import { TDInputs } from "./TDInputs.jsx";
import { TDNoAddresseeDelivery } from "./TDNoAddresseeDelivery.jsx";
import { TDButtons } from "./TDButtons.jsx";
import {
  deliveryStatusLocally,
  deliveryStatusWithAddressee,
  deliveryStatusWithNoAddressee,
  multiDeliveryLocally,
  multiDeliverStatus,
} from "../../utils/helpers/statusObjects.js";

export const TraditionalDeliver = () => {
  const {
    downloadedParcels,
    setDownloadedParcels,
    currentUser,
    handleSignatureButton,
    handleSignatureLink,
    chooseSubject,
    setChooseSubject,
    input,
    setInput,
    savePoints,
    setSavePoints,
    particularSubject,
    setParticularSubject,
    setIsUpdatingParcel,
  } = useContext(PostManState);
  const { parcels } = useParcels();
  const queryClient = useQueryClient();
  const findParcels = downloadedParcels.filter((parcel) => parcel.isMarked);

  const navigate = useNavigate();

  const [openList, setOpenList] = useState("");
  const [showSubjects, setShowSubjects] = useState(false);
  const [choosen, setChoosen] = useState("");
  const [addresseesData, setAddresseesData] = useState(true);
  const [noAddressee, setNoAddressee] = useState(false);
  const [showParticularSubject, setShowParticularSubject] = useState(false);

  const { mutateAsync: asyncChangeStatus } = useMutation({
    mutationFn: addDeliveredStatus,
    mutationKey: [PARCELS],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueryData([PARCELS]);

      queryClient.setQueryData([PARCELS], (old: any) => [...old, updatedParcel]);

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

  const { mutateAsync: asyncMultiDelivery } = useMutation({
    mutationFn: multiDeliveryStatus,
  });
  const handleList = (id: string | undefined) => {
    if (openList !== id) {
      setOpenList(id || "");
    } else setOpenList("");

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
    setIsUpdatingParcel(true);
    if (
      findParcels[0].noAddressee &&
      particularSubject === "Parcel left in place set with addressee" &&
      input === ""
    ) {
      alert("Type particular info delivery");

      return;
    }
    if (
      findParcels[0].noAddressee &&
      particularSubject !== "Parcel left in place set with addressee" &&
      input === ""
    ) {
      alert("Type name and surname delivery's subject");

      return;
    }
    if (!findParcels[0].noAddressee && input === "") {
      alert("Type name and surname delivery's subject");
    }
    if (findParcels.length > 1 && !findParcels[0].noAddressee) {
      asyncMultiDelivery(
        {
          nameOfStatus: "DELIVERED",
          date,
          signature: savePoints,
          noAddressee: findParcels[0].noAddressee,
          input,
          username: currentUser.username,
          chooseSubject,
          details: "",
        }
      )
        .catch((err) => {
          console.error("multiDeliveryWithAddressee failed:", err);
        })
        .finally(() => {
          console.log("multiDeliveryWithAddressee settled");
          setIsUpdatingParcel(false);
          queryClient.invalidateQueries({ queryKey: [PARCELS] });
        });
      setDownloadedParcels(
        multiDeliveryLocally({
          downloadedParcels,
          date,
          chooseSubject,
          details: "",
          noAddressee: findParcels[0].noAddressee,
          input,
        }

        ),
      );
      navigate("/workPage");
      setInput("");
    } else if (findParcels.length > 1 && findParcels[0].noAddressee) {
      asyncMultiDelivery(
        {
          nameOfStatus: "DELIVERED",
          date,
          signature: savePoints,
          noAddressee: findParcels[0].noAddressee,
          input,
          username: currentUser.username,
          chooseSubject,
          details: particularSubject,
        }
      )
        .catch((err) => {
          console.error("multiDeliveryNoAddressee failed:", err);
        })
        .finally(() => {
          console.log("multiDeliveryNoAddressee settled");
          setIsUpdatingParcel(false);
          queryClient.invalidateQueries({ queryKey: [PARCELS] });
        });

      setDownloadedParcels(
        multiDeliveryLocally({
          downloadedParcels,
          date,
          chooseSubject,
          details: particularSubject,
          noAddressee: findParcels[0].noAddressee,
          input,
        }),
      );
      navigate("/workPage");
      setInput("");
      setSavePoints(null);
    } else if (savePoints && !findParcels[0].noAddressee) {
      asyncChangeStatus(
        deliveryStatusWithAddressee({
          parcel: findParcels[0],
          chooseSubject,
          savePoints,
          input,
          date,
        }),
      )

        .catch((err) => {
          console.error("deliverWithAddressee failed:", err);
        })
        .finally(() => {
          console.log("deliverWithAddressee settled");
          setIsUpdatingParcel(false);
          queryClient.invalidateQueries({ queryKey: [PARCELS] });
        });
      setDownloadedParcels(
        deliveryStatusLocally({
          downloadedParcels,
          updatedParcel: findParcels[0],
          date,
          chooseSubject,
          particularSubject,
          input,
          noAddressee: false,
        }),
      );
      navigate("/workPage");
      setInput("");
      setSavePoints(null);
    } else if (findParcels[0].noAddressee) {
      asyncChangeStatus(
        deliveryStatusWithNoAddressee({
          parcel: findParcels[0],
          chooseSubject,
          particularSubject,
          savePoints,
          input,
          date,
        }),
      )
        .catch((err) => {
          console.error("deliverWithNoAddressee failed:", err);
        })
        .finally(() => {
          console.log("deliverWithNoAddressee settled");
          setIsUpdatingParcel(false);
          queryClient.invalidateQueries({ queryKey: [PARCELS] });
        });
      setDownloadedParcels(
        deliveryStatusLocally({
          downloadedParcels,
          updatedParcel: findParcels[0],
          date,
          chooseSubject,
          particularSubject,
          input,
          noAddressee: true,
        }),
      );
      navigate("/workPage");
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
  return (
    <>
      <div className="td__content">
        {showSubjects && (
          <TDSubjectWindow
            subjectsOption={subjectsOption}
            markedParcels={findParcels}
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
            setInput={setInput}
            input={input}
            markedParcel={findParcels[0]}
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
          handleList={handleList}
          findParcel={findParcels}
          openList={openList}
        />

        <TDSubjectOfDelivery
          setShowSubjects={setShowSubjects}
          openList={openList}
          markedParcels={findParcels}
          chooseSubject={chooseSubject}
        />
        <p className="td__receivingperson">Name and surname receiving person</p>
        <TDInputs
          markedParcels={findParcels}
          setInput={setInput}
          input={input}
          chooseSubject={chooseSubject}
          setAddresseesData={setAddresseesData}
          addresseesData={addresseesData}
          particularSubject={particularSubject}
        />
        <div className="td__signcontent">
          <TDNoAddresseeDelivery
            markedParcels={findParcels}
            setShowParticularSubject={setShowParticularSubject}
            particularSubject={particularSubject}
            setNoAddressee={setNoAddressee}
            noAddressee={noAddressee}
            setInput={setInput}
          />
        </div>
        <TDButtons
          markParcel={findParcels[0]}
          savePoints={savePoints}
          handleSignatureButton={handleSignatureButton}
          handleSignatureLink={handleSignatureLink}
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
