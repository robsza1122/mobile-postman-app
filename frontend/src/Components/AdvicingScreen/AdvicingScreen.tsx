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
import { addAdvicedStatus, multiAdvicingStatus } from "../../api/api";
import { ShowReasonAdvicedScreen } from "./ShowReasonAdvicedScreen";
import {
  advicedStatusLocally,
  advicedStatusObject,
  multiAdvicedStatus,
  multiAdvicedStatusLocally,
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
  const { mutateAsync: changeStatusAsync } = useMutation({
    mutationKey: [PARCELS],
    mutationFn: addAdvicedStatus,
  });

  const { mutateAsync: asyncMultiAdvice } = useMutation({
    mutationKey: [PARCELS],
    mutationFn: multiAdvicingStatus,
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

  const onChooseReason = (reason: string) => {
    setChooseReason(reason);
    setShowReason(false);
  };

  const onOffice = () => {
    setShowOffice(!showOffice);
  };
  const onChooseOffice = (office: string) => {
    setChooseOffice(office);
    setShowOffice(false);
  };

  const onPlaceNotification = () => {
    setShowNotifiedPlace(!showNotifiedPlace);
  };

  const onChooseNotificationPlace = (place: string) => {
    setChooseNotifiedPlace(place);
    setShowNotifiedPlace(false);
  };

  const handleConfirmButton = () => {
    setIsUpdatingParcel(true);
    if (currentParcels.length === 1) {
      changeStatusAsync(
        advicedStatusObject({
          parcel: currentParcels[0],
          chooseReason,
          chooseOffice,
          chooseNotifiedPlace,
          date: date(),
    }),
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
        advicedStatusLocally({
          downloadedParcels,
          currentParcel: currentParcels[0],
          date: date(),
          chooseReason,
          chooseOffice,
          chooseNotifiedPlace,
        }
        ),
      );
      navigate("/workPage");
    }
    if (currentParcels.length > 1) {
      asyncMultiAdvice(
        multiAdvicedStatus({
          createdAt: date(),
          reasonOfAdvice: chooseReason,
          placeOfAdvice: chooseOffice,
          placeOfNotification: chooseNotifiedPlace,
          user: currentUser.username,
    }),
      )
        .catch((err) => {
          console.error("addMultiAdvicedStatus failed:", err);
        })
        .finally(() => {
          console.log("addMultiAdvicedStatus settled");
          setIsUpdatingParcel(false);
          queryClient.invalidateQueries({ queryKey: [PARCELS] });
        });
      setDownloadedParcels(
        multiAdvicedStatusLocally({
          downloadedParcels,
          createdAt: date(),
          reasonOfAdvice: chooseReason,
          officeOfAdvice: chooseOffice,
          placeOfNotification: chooseNotifiedPlace,
        }
        ),
      );
      navigate("/workPage");
    }
  };

  console.log(currentParcels);

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
          title="ADVICE SCREEN"
          EMINumber={currentUser.EMINumber}
        />
        <div className="advice__adviced-window">
          {currentParcels.map((parcel) => (
            <SettledParcels key={parcel._id} parcel={parcel} />
          ))}
        </div>
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
