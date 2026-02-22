import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useParcels, { PARCELS } from "../../hooks/useParcels";
import { markParcel } from "../../api/api";
import { StatusHandlingPosition } from "./StatusHandlingPosition";
import { CreateParcelOrder } from "../../types/parcel.type";

type StatusHandlingListProps = {
    title: string;
    searchPosition: (parcels: CreateParcelOrder[]) => CreateParcelOrder[];
    visibleParcels: CreateParcelOrder[];
    statusType: string;
}

export const StatusHandlingList = ({
    title,
    searchPosition,
    visibleParcels,
    statusType,
}: StatusHandlingListProps) => {
    const {parcels} = useParcels();
    const {settled, setDownloadedParcels, downloadedParcels} = useContext(PostManState);
        const queryClient = useQueryClient();
  const { mutate: markClickedParcel } = useMutation({
    mutationFn: markParcel,
    mutationKey: [PARCELS],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData({ queryKey: [PARCELS] });

      queryClient.setQueryData([PARCELS], (old: CreateParcelOrder[]) => 
      old.map(parcel => {
        if (parcel._id === updatedParcel.id) {
          return {
            ...parcel,
            isMarked: !updatedParcel.isMarked,
          }
        }

        return parcel;
      })
      );

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });
  const listOfParcels = searchPosition(visibleParcels);

  const manageTitlePanelColor = (status: string) => {
    switch(status) {
      case 'IN DELIVERY':
        return 'darkred';
      case 'ADVICED':
        return 'rgba(208, 180, 7, 0.666)';
      case 'OTHERS':
        return 'rgba(21, 120, 250, 0.866)';
    }
  }

  const handleMarkParcel = (id: string | undefined, isMarked: boolean) => {
    markClickedParcel({id, markParcel: isMarked});
    const updateParcels = downloadedParcels.map(parcel => {
      if (parcel._id === id) {
        return {
          ...parcel,
          isMarked,
        }
      }

      return parcel;
    })
    setDownloadedParcels(updateParcels)
  }

  console.log(parcels)
    return (
        <>
                    <div className="deliver__titlepanelblock" style={{
                      backgroundColor: `${manageTitlePanelColor(statusType)}`
                    }}>{title}</div>
            {settled
              ? ""
              : listOfParcels.map((parcel) => {
                console.log(parcel.isMarked)
                  return (
                    <StatusHandlingPosition 
                    key={parcel._id}
                    parcel={parcel}
                    handleMarkParcel={handleMarkParcel}
                    isVERIFICATION={visibleParcels.length > 1 ? true : false}
                    />
                  );
                })}
                </>
    )
}