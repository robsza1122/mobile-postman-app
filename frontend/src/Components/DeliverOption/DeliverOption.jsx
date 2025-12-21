import useParcels, { PARCELS } from "../../hooks/useParcels";
import { StatusHandler } from "../StatusHandler/StatusHandler";
import { useContext, useEffect } from "react";
import { PostManState } from "../../PostGlobalProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAllParcelOnFalseInList } from "../../api/api";

export const DeliverOption = () => {
  const { parcels } = useParcels();
  const markedParcels = parcels.filter((parcel) => parcel.isMarked);
  const { currentUser, downloadedParcels, setDownloadedParcels } =
    useContext(PostManState);
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
    if (markedParcels.length === 1 && markedParcels[0].amountOfTrials === 3) {
      return "/traditionalDeliver";
    }
    if (markedParcels.length === 1) {
      return "/deliveryCodeScreen";
    }
    return;
  };

  const handleMultiDeliveryLink = () => {
    if (markedParcels.length === 0 || markedParcels.length === 1) {
      return "";
    } else if (markedParcels.length > 1) {
      return "/multiDeliveryVerification";
    }
  };
  return (
    <StatusHandler
      title={"DELIVER OPTION"}
      firstButton={"Individual Delivery"}
      secondButton={"Multi Delivery"}
      firstButtonLink={handleLink()}
      secondButtonLink={handleMultiDeliveryLink()}
    />
  );
};
