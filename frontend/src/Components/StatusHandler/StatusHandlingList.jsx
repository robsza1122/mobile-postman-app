import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useParcels, { PARCELS } from "../../hooks/useParcels";
import { markParcel } from "../../api/api";
import classNames from "classnames";

export const StatusHandlingList = ({
    title,
    searchPosition,
    visibleParcels,
    statusType,
}) => {
    const {parcels} = useParcels();
    const {settled, setDownloadedParcels, downloadedParcels} = useContext(PostManState);
        const queryClient = useQueryClient();
  const { mutate: markClickedParcel } = useMutation({
    mutationFn: markParcel,
    mutationKey: [PARCELS],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData([PARCELS]);

      queryClient.setQueryData([PARCELS], (old) => 
      old.map(parcel => {
        if (parcel.id === updatedParcel.id) {
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

  const manageTitlePanelColor = (status) => {
    switch(status) {
      case 'IN DELIVERY':
        return 'darkred';
      case 'ADVICED':
        return 'rgba(208, 180, 7, 0.666)';
      case 'OTHERS':
        return 'rgba(21, 120, 250, 0.866)';
    }
  }

  const handleMarkParcel = (id, isMarked) => {
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

  console.log(downloadedParcels)
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
                    <div className="deliver__position" key={parcel._id}>
                      <div className="deliver__positioncontent">
                        <p className="deliver__number">
                          {parcel.numberOfParcel}
                        </p>
                        <p className="deliver__info">{`${parcel.name} ${parcel.surname}`}</p>
                        <p className="deliver__info">{parcel.adress}</p>
                        <p className="deliver__adress">{`${parcel.city} ${parcel.postCode}`}</p>
                      </div>
                      <div className="deliver__inputcash">
                        <input
                          type="checkbox"
                          className={classNames('deliver__checkbox', {
                            'deliver__checkbox--is-checked': parcel.isMarked,
                          })}
                          checked={parcel.isMarked}
                          onClick={() => handleMarkParcel(parcel._id, !parcel.isMarked)}
                        />
                        {parcel.amount !== 0 && (
                          <p className="deliver__cash">
                            {!parcel.amount.toString().includes(".")
                              ? `${parcel.amount}.00`
                              : `${parcel.amount}`}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
                </>
    )
}