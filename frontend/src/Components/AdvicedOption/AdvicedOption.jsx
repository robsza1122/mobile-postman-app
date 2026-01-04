import { useContext, useState } from "react";
import { PostManState } from "../../PostGlobalProvider";
import classnames from "classnames";
import { markAllParcelOnFalseInList } from "../../api/api";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useParcels, { PARCELS } from "../../hooks/useParcels";
import { StatusHandler } from "../StatusHandler/StatusHandler";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const AdvicedOption = () => {
  const { currentUser, downloadedParcels, setDownloadedParcels } = useContext(PostManState);
  const markedParcels = downloadedParcels.filter(parcel => parcel.isMarked);
  const queryClient = useQueryClient();
  const { mutate: markAllOnFalsy } = useMutation({
    mutationFn: markAllParcelOnFalseInList,
    mutationKey: [PARCELS],
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData([PARCELS]);

      queryClient.setQueryData([PARCELS], (old) => {
        if (!old) return old;

        return old.map((parcel) => {
          if (
            parcel.isDownloaded === true &&
            parcel.forUser === currentUser?.username &&
            parcel.isMarked
          ) {
            return {
              ...parcel,
              isMarked: false,
            };
          }

          return parcel;
        });
      });

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

    useEffect(() => {
    if (!currentUser || !currentUser.username) return;

    // clear marks on server and locally for current user's downloaded parcels
    markAllOnFalsy({ user: currentUser.username });

    setDownloadedParcels(
      (downloadedParcels || []).map((parcel) => {
        if (
          parcel.isDownloaded === true &&
          parcel.forUser === currentUser.username &&
          parcel.isMarked
        ) {
          return {
            ...parcel,
            isMarked: false,
          };
        }

        return parcel;
      }),
    );
  }, [currentUser?.username]);

   const handleLink = () => {
    if (markedParcels.length === 0) {
      return '';
    }
      if (markedParcels.length === 1) {
        return "/advicingScreen";
      }
      return '';
    };
  
    const handleMultiAdvicingLink = () => {
      if (markedParcels.length === 0 || markedParcels.length === 1) {
        return "";
      } else if (markedParcels.length > 1) {
        return "/multiAdvicingVerification";
      }
    };
  
  const handleOneAdvicingAlerts = (e) => {
    const parcelIsMarked = markedParcels.length;
    switch (parcelIsMarked) {
      case 0:
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        return alert("no parcel is marked");
      case 1: {
        const addressee = `${markedParcels[0].name} ${markedParcels[0].surname}`;
        setSavePoints(null);
        setInput(addressee);
        setDownloadedParcels(
          setNoAddresseLocally(downloadedParcels, markedParcels[0]),
        );
        return;
      }
      default:
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        return alert("More than one position is marked");
    }
  };
  
    const handleMultiAdvicingAlerts = () => {
      const parcelIsMarked = markedParcels.length;
      switch (parcelIsMarked) {
        case 0:
          return alert("No position is marked");
        case 1:
          return alert("Mark more than one position");
      }
    };
  return (
    <StatusHandler
    title="ADVICED OPTION"
    firstButton="Individiual Advice"
    secondButton="Multi Advice"
    onFirstButtonClick={handleOneAdvicingAlerts}
    onSecondButtonClick={handleMultiAdvicingAlerts}
    firstButtonLink={handleLink}
    secondButtonLink={handleMultiAdvicingLink} />
  )
};
