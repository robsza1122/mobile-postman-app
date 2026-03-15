import "../AdvicingScreen/AdvicingScreen.scss";
import { useContext, useEffect, useState } from "react";
import { PostManState } from "../../PostGlobalProvider.js";
import { resultOfDelivery } from "../../utils/DataProvider.js";
import { date } from "../../utils/currentDate.js";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOtherResult, multiResultsStatus } from "../../api/api.js";

import { PARCELS } from "../../hooks/useParcels.js";
import {
  multiResults,
  multiResultsLocally,
  otherResultStatus,
  otherStatusLocally,
} from "../../utils/helpers/statusObjects.js";
import { handleChoosingOptions } from "../../utils/helpers/otherOptionSelection.js";
import { OtherOptionResult } from "./OtherOptionResult.jsx";
import { OtherOptionDetails } from "./OtherOptionDetails.js";
import { AppNavigation } from "../AppNavigation/AppNavigation.js";
import { SettledParcels } from "./SettledParcels.js";
import { OtherOptionButton } from "./OtherOptionButton.jsx";
import { OtherOptionExceptions } from "./OtherOptionExceptions.jsx";
import { OtherOptionButtons } from "./OtherOptionButtons.jsx";

export const OtherOptionScreen = () => {
  const {
    currentUser,
    setInput,
    input,
    setDownloadedParcels,
    downloadedParcels,
    setIsUpdatingParcel,
  } = useContext(PostManState);
  const currentParcels = downloadedParcels.filter((parcel) => parcel.isMarked);
  const { mutateAsync: otherResultAsync } = useMutation({
    mutationKey: [PARCELS],
    mutationFn: addOtherResult,
  });
  const { mutateAsync: multiResultsAsync } = useMutation({
    mutationKey: [PARCELS],
    mutationFn: multiResultsStatus,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [chooseResult, setChooseResult] = useState("Parcel postponed");
  const [showResult, setShowResult] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [chooseDetails, setChooseDetails] = useState(
    "Addressee ordered delivery again",
  );

  const onResult = () => {
    setShowResult(!showResult);
  };

  const onDetails = () => {
    setShowDetails(!showDetails);
  };
  const onChooseDetails = (details: string) => {
    setChooseDetails(details);
    setShowDetails(false);
  };

  const onChooseResult = (result: string) => {
    setChooseResult(result);
    setShowResult(false);
  };

  const handleConfirmButton = () => {
    const { dateStr } = date();
    if (chooseDetails === "Parcel returned from other reason" && input === "") {
      alert("No other reason is typed");
      return;
    }

    if (chooseDetails === "Parcel lost" && input === "") {
      alert("No reason is typed");
      return;
    }
    if (
      chooseDetails === "Parcel left in shop, ORLEN, ParcelPoint" &&
      input === ""
    ) {
      alert("No name and surname is typed");
      return;
    }

    setIsUpdatingParcel(true);
    if (currentParcels.length === 1) {
      otherResultAsync(
        otherResultStatus({
          parcel: currentParcels[0],
          chooseResult,
          chooseDetails,
          input,
          date: dateStr,
    }),
      )
        .catch((err) => {
          console.error("addOtherResult failed:", err);
        })
        .finally(() => {
          console.log("addOtherResult settled");
          setIsUpdatingParcel(false);
          queryClient.invalidateQueries({ queryKey: [PARCELS] });
        });
      setDownloadedParcels(
        otherStatusLocally({
          downloadedParcels,
          currentParcel: currentParcels[0],
          input,
          chooseResult,
          chooseDetails,
          date: dateStr,
    }),
      );
      navigate("/workPage");
    }
    if (currentParcels.length > 1) {
      multiResultsAsync(
        multiResults({
          date: dateStr,
          chooseResult,
          chooseDetails,
          input,
          user: currentUser.username,
    }),
      )
        .catch((err) => {
          console.error("addOtherMultiResult failed:", err);
        })
        .finally(() => {
          console.log("addOtherMultiResult settled");
          setIsUpdatingParcel(false);
          queryClient.invalidateQueries({ queryKey: [PARCELS] });
        });

      setDownloadedParcels(
        multiResultsLocally({
          downloadedParcels,
          createdAt: dateStr,
          chooseResult,
          chooseDetails,
          input,
    }),
      );
      navigate("/workPage");
    }
  };

  console.log(chooseResult);
  console.log(chooseDetails);

  return (
    <>
      {showResult && (
        <OtherOptionResult
          resultOfDelivery={resultOfDelivery}
          onChooseResult={onChooseResult}
          onChooseDetails={onChooseDetails}
        />
      )}
      {showDetails && (
        <OtherOptionDetails
          onChooseDetails={onChooseDetails}
          chooseResult={chooseResult}
        />
      )}

      <div className="advice">
        <AppNavigation
          username={currentUser.username}
          title="OTHER"
          EMINumber={currentUser.EMINumber}
        />
        {currentParcels.map((parcel) => {
          return <SettledParcels parcel={parcel} key={parcel._id} />;
        })}
        <div className="advice__content">
          <OtherOptionButtons
            onResult={onResult}
            onDetails={onDetails}
            chooseDetails={chooseDetails}
            chooseResult={chooseResult}
          />
          <OtherOptionExceptions
            chooseDetails={chooseDetails}
            setInput={setInput}
            input={input}
          />
        </div>
        <OtherOptionButton handleConfirmButton={handleConfirmButton} />
      </div>
    </>
  );
};
