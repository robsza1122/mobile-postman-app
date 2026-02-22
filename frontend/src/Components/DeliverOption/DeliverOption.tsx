import useParcels, { PARCELS } from "../../hooks/useParcels";
import { StatusHandler } from "../StatusHandler/StatusHandler";
import { useContext, useEffect } from "react";
import { PostManState } from "../../PostGlobalProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAllParcelOnFalseInList } from "../../api/api";
import { setNoAddresseLocally } from "../../utils/helpers/statusObjects";
import { CreateParcelOrder } from "../../types/parcel.type";

export const DeliverOption = () => {
  const {
    currentUser,
    downloadedParcels,
    setDownloadedParcels,
    setSavePoints,
    setInput,
  } = useContext(PostManState);
  const queryClient = useQueryClient();

  const markedParcels = downloadedParcels.filter((parcel) => parcel.isMarked);

  const { mutate: markAllOnFalsy } = useMutation({
    mutationFn: markAllParcelOnFalseInList,
    mutationKey: [PARCELS],
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData({ queryKey: [PARCELS] });

      queryClient.setQueryData([PARCELS], (old: CreateParcelOrder[] = []) => {
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
            isMarkedVERIFICATION: false,
          };
        }

        return parcel;
      }),
    );
  }, [currentUser?.username]);
  const handleLink = () => {
    if (markedParcels.length === 0) {
      return "";
    }
    if (markedParcels.length === 1 && markedParcels[0].amountOfTrials === 3) {
      return "/traditionalDeliver";
    }
    if (markedParcels.length === 1) {
      return "/deliveryCodeScreen";
    }
    return "";
  };

  const handleMultiDeliveryLink = () => {
     if (markedParcels.length > 1) {
      return "/multiDeliveryVerification";
    }
    return "";
  };

  const handleOneDeliveryAlerts = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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

  const handleMultiDeliveryAlerts = () => {
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
      title={"DELIVER OPTION"}
      firstButton={"Individual Delivery"}
      secondButton={"Multi Delivery"}
      onFirstButtonClick={handleOneDeliveryAlerts}
      onSecondButtonClick={handleMultiDeliveryAlerts}
      firstButtonLink={handleLink}
      secondButtonLink={handleMultiDeliveryLink}
    />
  );
};
