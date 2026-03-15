import { Link } from "react-router-dom";
import "./MyParcelOption.scss";
import useParcels, { PARCELS } from "../../hooks/useParcels";
import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";
import { markAllParcelOnFalseInList } from "../../api/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { CreateParcelOrder } from "../../types/parcel.type";

type MyParcelOptionProps = {
  option: {
    header: string;
    title: string;
    amount: number;
  };
}

export const MyParcelOption = ({ option }: MyParcelOptionProps) => {
  const { currentUser, downloadedParcels, setDownloadedParcels } =
    useContext(PostManState);
  const { parcels } = useParcels();
  const queryClient = useQueryClient();
  const { mutate: markAllOnFalsy } = useMutation({
    mutationFn: markAllParcelOnFalseInList,
    mutationKey: [PARCELS],
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData({ queryKey: [PARCELS] });

      queryClient.setQueryData([PARCELS], (old: CreateParcelOrder[]) => {
        if (!old) return old;

        return old.map((parcel) => {
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
        });
      });

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

  const { header, title, amount } = option;
  console.log(header);
  const handleRouterLinks = (chosenLink: string) => {
    switch (chosenLink) {
      case "DELIVER":
        return "/deliverOption";
      case "SHOW ALL":
        return "/booklist";
      case "ADD OTHERS":
        return "/otherOption";
      case "ADVICE":
        return "/advicedOption";
        default:
          return "#";
    }
  };

  const handleMarkParcelOnFalse = async () => {
    // call server mutation (optimistic update handled in onMutate)
    markAllOnFalsy({ user: currentUser.username });

    // update local downloadedParcels: only for downloaded parcels belonging to current user
    setDownloadedParcels(
      downloadedParcels.map((parcel) => {
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
  };

  console.log(handleRouterLinks(header));
  console.log(amount)

  return (
    <Link
      className="parceloption__content"
      onClick={() => handleMarkParcelOnFalse()}
      to={handleRouterLinks(header)}
    >
      <h1 className="parceloption__header">{header}</h1>
      <p className="parceloption__amount">{amount}</p>
      <p className="parceloption__title">{title}</p>
    </Link>
  );
};
