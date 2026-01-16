import "../AdvicingScreen/AdvicingScreen.scss";
import { useContext, useEffect, useState } from "react";
import { PostManState } from "../../PostGlobalProvider";
import { resultOfDelivery } from "../../utils/DataProvider";
import { date } from "../../utils/currentDate";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOtherResult, multiResultsStatus } from "../../api/api";

import { PARCELS } from "../../hooks/useParcels.js";
import {
  multiResults,
  multiResultsLocally,
  otherResultStatus,
  otherStatusLocally,
} from "../../utils/helpers/statusObjects";
import { handleChoosingOptions } from "../../utils/helpers/otherOptionSelection";
import { OtherOptionResult } from "./OtherOptionResult";
import { OtherOptionDetails } from "./OtherOptionDetails";
import { AppNavigation } from "../AppNavigation/AppNavigation";
import { SettledParcels } from "./SettledParcels";
import { OtherOptionButton } from "./OtherOptionButton";
import { OtherOptionExceptions } from "./OtherOptionExceptions";
import { OtherOptionButtons } from "./OtherOptionButtons";

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
  const onChooseDetails = (Details) => {
    setChooseDetails(Details);
    setShowDetails(false);
  };

  const onChooseResult = (result) => {
    setChooseResult(result);
    setShowResult(false);
  };

  const handleConfirmButton = () => {
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
        otherResultStatus(
          currentParcels[0],
          chooseResult,
          chooseDetails,
          input,
          date,
        ),
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
        otherStatusLocally(
          downloadedParcels,
          currentParcels[0],
          input,
          chooseResult,
          chooseDetails,
          date,
        ),
      );
      navigate("/workPage");
    }
    if (currentParcels.length > 1) {
      multiResultsAsync(
        multiResults(
          date,
          chooseResult,
          chooseDetails,
          input,
          currentUser.username,
        ),
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
        multiResultsLocally(
          downloadedParcels,
          date,
          chooseResult,
          chooseDetails,
          input,
        ),
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
          pageName="OTHER"
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
