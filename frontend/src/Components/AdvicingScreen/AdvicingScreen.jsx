import "./AdvicingScreen.scss";
import { useContext, useState, useEffect } from "react";
import { PostManState } from "../../PostGlobalProvider";
import {
  placeOfAdvice,
  placeOfNotification,
  reasonOfAdvice,
} from "../../utils/DataProvider";
import { date } from "../../utils/currentDate";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAdvicedStatus } from "../../api/api";
import { ShowReasonAdvicedScreen } from "./ShowReasonAdvicedScreen";
import {
  advicedStatusLocally,
  advicedStatusObject,
} from "../../utils/helpers/statusObjects";
import { AppNavigation } from "../AppNavigation/AppNavigation";
import { SettledParcels } from "../OtherOptionScreen/SettledParcels";
import { AdvicedScreenButtons } from "./AdvicedScreenButtons";
import { AdvicedConfirmButton } from "./AdvicedConfirmButton";
import { AdvicedButtons } from "./AdvicedButtons";
import { Loading } from "../../Loading/Loading";
import { PARCELS } from "../../hooks/useParcels";

export const AdvicingScreen = () => {
  const {
    currentUser,
    setDownloadedParcels,
    downloadedParcels,
    setIsUpdatingParcel,
  } = useContext(PostManState);
  const currentParcels = downloadedParcels.filter((parcel) => parcel.isMarked);
  const { mutateAsync: changeStatusAsync, mutate: changeStatus } = useMutation({
    mutationKey: ["advicedParcel"],
    mutationFn: addAdvicedStatus,
  });
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    const handlePop = () => {
      const marked = (downloadedParcels || []).filter((p) => p.isMarked);
      if (!marked || marked.length === 0) {
        navigate("/advicingOption");
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

  const [chooseReason, setChooseReason] = useState(
    "No one at home / closed company",
  );
  const [showReason, setShowReason] = useState(false);
  const [showOffice, setShowOffice] = useState(false);
  const [showNotifiedPlace, setShowNotifiedPlace] = useState(false);
  const [chooseNotifiedPlace, setChooseNotifiedPlace] = useState(
    "Post box of addressee",
  );
  const [chooseOffice, setChooseOffice] = useState("Pocztowa 1 UP 1");

  const onReason = () => {
    setShowReason(!showReason);
  };

  const onChooseReason = (reason) => {
    setChooseReason(reason);
    setShowReason(false);
  };

  const onOffice = () => {
    setShowOffice(!showOffice);
  };
  const onChooseOffice = (office) => {
    setChooseOffice(office);
    setShowOffice(false);
  };

  const onPlaceNotification = () => {
    setShowNotifiedPlace(!showNotifiedPlace);
  };

  const onChooseNotificationPlace = (place) => {
    setChooseNotifiedPlace(place);
    setShowNotifiedPlace(false);
  };

  const handleConfirmButton = () => {
    setIsUpdatingParcel(true);
    changeStatusAsync(
      advicedStatusObject(
        currentParcels[0],
        chooseReason,
        chooseOffice,
        chooseNotifiedPlace,
        date,
      ),
    )
      .catch((err) => {
        console.error("addAdvicedStatus failed:", err);
      })
      .finally(() => {
        console.log("addAdvicedStatus settled");
        setIsUpdatingParcel(false);
        queryClient.invalidateQueries({ queryKey: [PARCELS] });
      });
    setDownloadedParcels(
      advicedStatusLocally(
        downloadedParcels,
        currentParcels[0],
        date,
        chooseReason,
        chooseOffice,
        chooseNotifiedPlace,
      ),
    );
    navigate("/workPage");
  };

  console.log(chooseNotifiedPlace);

  return (
    <>
      {showReason && (
        <ShowReasonAdvicedScreen
          onChooseReason={onChooseReason}
          reasonOfAdvice={reasonOfAdvice}
        />
      )}
      <AdvicedButtons
        showOffice={showOffice}
        showNotifiedPlace={showNotifiedPlace}
        placeOfAdvice={placeOfAdvice}
        onChooseNotificationPlace={onChooseNotificationPlace}
        onChooseOffice={onChooseOffice}
        placeOfNotification={placeOfNotification}
      />

      <div className="advice">
        <AppNavigation
          username={currentUser.username}
          pageName="ADVICE SCREEN"
          EMINumber={currentUser.EMINumber}
        />
        {currentParcels.map((parcel) => {
          <SettledParcels key={parcel._id} parcel={parcel} />;
        })}
        <div className="advice__content">
          <AdvicedScreenButtons
            onReason={onReason}
            onOffice={onOffice}
            onPlaceNotification={onPlaceNotification}
            chooseReason={chooseReason}
            chooseNotifiedPlace={chooseNotifiedPlace}
            chooseOffice={chooseOffice}
          />
        </div>
        <AdvicedConfirmButton handleConfirmButton={handleConfirmButton} />
      </div>
    </>
  );
};
