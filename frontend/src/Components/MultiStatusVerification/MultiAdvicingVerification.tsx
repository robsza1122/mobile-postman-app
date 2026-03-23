import { useContext, useState } from "react";
import { PostManState } from "../../PostGlobalProvider";
import "./MultiStatusVerification.scss";
import { AppNavigation } from "../AppNavigation/AppNavigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useParcels, { PARCELS } from "../../hooks/useParcels";
import {
  markParcelVERIFICATION,
  removingParcelsVERIFICATION,
} from "../../api/api";
import { TrailInput } from "../TrailOption/TrailInput";
import { StatusHandlingPosition } from "../StatusHandler/StatusHandlingPosition";
import { StatusHandlingButtons } from "../StatusHandler/StatusHandlingButtons";
import { useNavigate } from "react-router-dom";
import { setNoAddresseLocally } from "../../utils/helpers/statusObjects";
import { CreateParcelOrder } from "../../types/parcel.type";
import { StatusHandlingVerifiedPosition } from "../StatusHandler/StatusHandlingVerifiedPosition";

export const MultiAdvicingVerification = () => {
  const { parcels } = useParcels();
  const navigate = useNavigate();
  const {
    currentUser,
    downloadedParcels,
    setDownloadedParcels,
    setSavePoints,
    setInput,
  } = useContext(PostManState);
  const [parcelsNumber, setParcelsNumber] = useState("");
  const queryClient = useQueryClient();
  let markedParcels = downloadedParcels.filter((parcel) => parcel.isMarked);
  const { mutate: markClickedParcel } = useMutation({
    mutationFn: markParcelVERIFICATION,
    mutationKey: [PARCELS],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData({ queryKey: [PARCELS] });

      queryClient.setQueryData([PARCELS], (old: CreateParcelOrder[] = []) =>
        old.map((parcel) => {
          if (
            parcel._id === updatedParcel.id ||
            parcel._id === updatedParcel.id
          ) {
            return {
              ...parcel,
              isMarkedVERIFICATION: !parcel.isMarkedVERIFICATION,
            };
          }

          return parcel;
        }),
      );

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

  const { mutate: removeParcels } = useMutation({
    mutationFn: removingParcelsVERIFICATION,
    mutationKey: [PARCELS],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData({ queryKey: [PARCELS] });

      queryClient.setQueryData([PARCELS], (old: CreateParcelOrder[] = []) =>
        old.map((parcel) => {
          if (parcel.isMarkedVERIFICATION) {
            return {
              ...parcel,
              isMarkedVERIFICATION: false,
              isMarked: false,
            };
          }

          return parcel;
        }),
      );

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

  const filteredParcels = (positions: CreateParcelOrder[]) => {
    return positions.filter((parcel) => {
      const searchedText = `${parcel.name}${parcel.surname}${parcel.numberOfParcel}${parcel.postCode}${parcel.city}`;
      return searchedText
        .trim()
        .toLocaleLowerCase()
        .includes(parcelsNumber.trim().toLocaleLowerCase());
    });
  };

  let visibleParcels = filteredParcels(markedParcels);

  const handleMarkParcel = (id: string | undefined, isMarked: boolean) => {
    markClickedParcel({ id, markParcel: isMarked });
    const updateParcels = downloadedParcels.map((parcel) => {
      if (id === parcel._id) {
        return {
          ...parcel,
          isMarkedVERIFICATION: !parcel.isMarkedVERIFICATION,
        };
      }

      return parcel;
    });
    setDownloadedParcels(updateParcels);
  };

  const handleClickOnMultiAdvice = () => {
    if (visibleParcels.length === 0) {
      alert("No parcels to advice");
      return;
    }

    if (visibleParcels.length === 1) {
      alert("Multi Advicing should have more than one parcel");
      return;
    }
    setSavePoints(null);
    setInput("");
    setDownloadedParcels(
      setNoAddresseLocally(downloadedParcels, markedParcels[0]),
    );
  };

  const handleClickOnRemovingParcels = () => {
    const parcelMarkedLength = downloadedParcels.filter(
      (parcel) => parcel.isMarkedVERIFICATION,
    ).length;
    if (parcelMarkedLength === 0) {
      alert("No parcels to remove");
      return;
    }

    if (visibleParcels.length - parcelMarkedLength < 2) {
      alert("At least two parcels have to leave in multi status handler");
      return;
    }
    removeParcels({ user: currentUser.username });
    const updateParcels = downloadedParcels.map((parcel) => {
      if (parcel.isMarkedVERIFICATION) {
        return {
          ...parcel,
          isMarkedVERIFICATION: false,
          isMarked: false,
        };
      }

      return parcel;
    });
    setDownloadedParcels(updateParcels);
  };

  const handleLinksOnRemovingParcels = () => {
    // const parcelMarked = visibleParcels.filter(
    //   (parcel) => parcel.isMarkedVERIFICATION,
    // );
    // if (parcelMarked.length === 1) {
    //   alert("Mark more than one parcel");

    //   return '';
    // }

    return '';
  };
  return (
    <div className="msv">
      <AppNavigation
        username={currentUser.username}
        title="MULTI STATUS VERIFICATION"
        EMINumber={currentUser.EMINumber}
      />
      <TrailInput
        parcelsNumber={parcelsNumber}
        setParcelsNumber={setParcelsNumber}
        onSubmit={() => {}}
      />

      <div className="msv__list">
        {visibleParcels.map((parcel) => {
          return (
            <StatusHandlingVerifiedPosition
              parcel={parcel}
              handleMarkParcel={handleMarkParcel}
            />
          );
        })}
        <StatusHandlingButtons
          slideOptions={0}
          firstButton="Carry out Multi Advice"
          secondButton="Remove marked parcels"
          firstButtonLink={() => "/advicingScreen"}
          secondButtonLink={handleLinksOnRemovingParcels}
          onFirstButtonClick={handleClickOnMultiAdvice}
          onSecondButtonClick={handleClickOnRemovingParcels}
        />
      </div>
    </div>
  );
};
