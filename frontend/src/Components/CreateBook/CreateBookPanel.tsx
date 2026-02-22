import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";
import {
  markAllOnTrue,
  markAllOnFalse,
  assignParcelsToUser,
} from "../../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { PARCELS } from "../../hooks/useParcels";
import useParcels from "../../hooks/useParcels";
import makeDifferentNumbers from "../../hooks/createDifferentNumbers";
import { CreateParcelOrder } from "../../types/parcel.type";

type CreateBookPanelProps = {
  assignedUser: string;
  setShowUsersWindow: (show: boolean) => void;
};

export const CreateBookPanel = ({
  assignedUser,
  setShowUsersWindow,
}: CreateBookPanelProps) => {
  const { setInput, input, setDeliveryBooks, deliveryBooks } =
    useContext(PostManState);
  const { parcels } = useParcels() as { parcels: CreateParcelOrder[] };
  const queryClient = useQueryClient();

  const { mutate: markOnTrue } = useMutation({
    mutationFn: markAllOnTrue,
    mutationKey: [PARCELS],
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData({
        queryKey: [PARCELS],
      });

      queryClient.setQueryData([PARCELS], (old: CreateParcelOrder[] = []) =>
        old.map((parcel) => parcel.isMarked),
      );

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

  const { mutate: markOnFalse } = useMutation({
    mutationFn: markAllOnFalse,
    mutationKey: [PARCELS],
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData({
        queryKey: [PARCELS],
      });

      queryClient.setQueryData([PARCELS], (old: CreateParcelOrder[] = []) =>
        old.map((parcel) => !parcel.isMarked),
      );

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

  const { mutate: assignParcels } = useMutation({
    mutationFn: assignParcelsToUser,
    mutationKey: [PARCELS],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData({
        queryKey: [PARCELS],
      });

      queryClient.setQueryData([PARCELS], (old: CreateParcelOrder[] = []) => [
        ...old,
        updatedParcel,
      ]);

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

  const handleTogglingParcels = () => {
    const allAreChecked =
      (Array.isArray(parcels) ? parcels : []).filter((parcel) => parcel.isMarked && !parcel.isBooked).length ===
      (Array.isArray(parcels) ? parcels : []).filter((parcel) => !parcel.isBooked).length;

    if (allAreChecked) {
      markOnFalse();
    } else if (!allAreChecked) {
      markOnTrue();
    }
  };

  const handleAddingButton = () => {
    const { numberOfDeliveryBook } = makeDifferentNumbers(8);
    if (assignedUser === "") {
      alert("Please choose user firstly.");

      return;
    }
    if (parcels.filter((parcel) => parcel.isMarked).length === 0) {
      alert("Nothing is added to the book.");

      return;
    }
    assignParcels({
      numberOfBook: numberOfDeliveryBook,
      username: assignedUser,
    });

    const newDeliveryBook = {
      numberOfBook: numberOfDeliveryBook,
      username: assignedUser,
      parcels: parcels
        .map((parcel) => {
          if (parcel.isMarked) {
            return {
              ...parcel,
              isMarked: false,
              isBooked: true,
              forUser: assignedUser,
              numberOfBook: numberOfDeliveryBook,
            };
          }

          return parcel;
        })
        .filter((parcel) => parcel.numberOfBook === numberOfDeliveryBook),
    };

    setDeliveryBooks([...deliveryBooks, newDeliveryBook]);
  };

  return (
    <>
      <div className="createbook__inputcontent">
        <input
          type="text"
          className="createbook__find"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="find parcel..."
        />
        <img
          src="src/image/magni-glass-black.svg"
          alt=""
          className="createbook__glass"
        />
      </div>
      <div className="createbook__buttons">
        <button
          className="createbook__button"
          onClick={() => handleTogglingParcels()}
        >
          Toggle all parcels
        </button>

        <button
          className="createbook__button"
          onClick={() => handleAddingButton()}
        >
          Create delivery book
        </button>
        <div className="createbook__useroptions">
          <p className="createbook__userinfo">Choose user:</p>
          <button
            className="createbook__choosenUser"
            onClick={() => setShowUsersWindow(true)}
          >
            {!assignedUser ? "Choose user" : assignedUser}
          </button>
        </div>
      </div>
    </>
  );
};
