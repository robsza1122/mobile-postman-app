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
  const { parcels } = useParcels();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: markAllOnFalsy } = useMutation({
    mutationFn: markAllParcelOnFalseInList,
    mutationKey: ["parcels"],
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

  const markedParcels = parcels.filter((parcel) => parcel.isMarked);
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
    title="ADVICED OPTION"
    firstButton="Individiual Advice"
    secondButton="Multi Advice" />
  )
};
