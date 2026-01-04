import "../StatusHandler/statushandler.scss";
import { useContext, useState, useEffect } from "react";
import { PostManState } from "../../PostGlobalProvider";
import useParcels, { PARCELS } from "../../hooks/useParcels";
import { StatusHandler } from "../StatusHandler/StatusHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAllParcelOnFalseInList } from "../../api/api";

export const OtherOption = () => {
   const queryClient = useQueryClient();
   const { currentUser, downloadedParcels, setDownloadedParcels } = useContext(PostManState);
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
  return (
    <StatusHandler 
    title="OTHER OPTION"
    firstButton="Other Status"
    secondButton="Grouped Result"
    firstButtonLink="/otherOptionScreen" />
  );
};
