import { useContext } from "react";
import useParcels, { PARCELS } from "../../hooks/useParcels";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { markParcel } from "../../api/api";

export const ListOfDateBaseParcels = () => {
  const { input } = useContext(PostManState);
  const { parcels } = useParcels();

  const queryClient = useQueryClient();
  const { mutate: markClickedParcel } = useMutation({
    mutationFn: markParcel,
    mutationKey: [PARCELS],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData([PARCELS]);

      queryClient.setQueryData([PARCELS], (old) => [...old, updatedParcel]);

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

  const handleFindingParcels = () => {
    return parcels.filter((parcel) => {
      const searchedText = `${parcel.name} ${parcel.surname} ${parcel.numberOfParcel} ${parcel.city} ${parcel.postCode} ${parcel.adress}`;

      return searchedText
        .toLowerCase()
        .trim()
        .includes(input.toLowerCase().trim());
    });
  };
  return (
    <div className="createbook__listofparcels">
      {handleFindingParcels().map((parcel) => {
        const handleMarkingParcel = (parcelsId) => {
          return parcels.map((parcel) => {
            if (parcel._id === parcelsId) {
              markClickedParcel({
                markParcel: !parcel.isMarked,
                id: parcelsId,
              });

              return {
                ...parcel,
                isMarked: !parcel.isMarked,
              };
            }
            return parcel;
          });
        };
        const handleText = () => {
          if (parcel.isBooked) {
            return "PARCEL BOOKED";
          } else if (!parcel.isBooked && !parcel.isMarked) {
            return "ADD";
          } else if (!parcel.isBooked && parcel.isMarked) {
            return "REMOVE";
          } else {
            return "ERROR";
          }
        };

        return (
          <div
            className="deliver__position"
            key={parcel._id}
            style={{
              background: `${
                handleText() === "PARCEL BOOKED" ? "rgba(0, 0, 0, 0.06)" : ""
              }`,
            }}
          >
            <div className="deliver__positioncontent">
              <p className="deliver__number">{parcel.numberOfParcel}</p>
              <p className="deliver__info">{`${parcel.name} ${parcel.surname}`}</p>
              <p className="deliver__info">{parcel.adress}</p>
              <p className="deliver__adress">{`${parcel.city} ${parcel.postCode}`}</p>
            </div>
            <div className="createbook__add">
              <p className="createbook__addedtext">{handleText()}</p>
              {!parcel.isBooked && (
                <input
                  type="checkbox"
                  className={classNames("createbook__checkbox", {
                    "createbook__checkbox--checked": parcel.isMarked,
                  })}
                  value={parcel.isMarked}
                  onClick={() => {
                    handleMarkingParcel(parcel._id);
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
