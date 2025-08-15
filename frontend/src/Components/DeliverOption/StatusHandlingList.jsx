import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useParcels, { PARCELS } from "../../hooks/useParcels";
import { markParcel } from "../../api/api";

export const StatusHandlingList = ({
    title,
    searchPosition,
    visibleParcels,
    statusType,
}) => {
    const {parcels} = useParcels();
    const {settled} = useContext(PostManState);
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
    return (
        <>
                    <div className="deliver__titlepanelblock" style={{
                      backgroundColor: `${manageTitlePanelColor(statusType)}`
                    }}>{title}</div>
            {settled
              ? ""
              : listOfParcels.map((parcel) => {
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
                          className="deliver__checkbox"
                          onClick={() => markClickedParcel({id: parcel._id, markParcel: !parcel.isMarked})}
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