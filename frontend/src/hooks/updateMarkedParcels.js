import { useQueryClient, useMutation } from "@tanstack/react-query";
import { markParcel } from "../api/api";

const updateMarkedParcel = (data) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => markParcel(data),
    onSuccess: () => {
      queryClient.setQueryData(["parcels"], (cache) =>
        cache.map((parcel) => {
          if (data.id === parcel._id) {
            return {
              ...parcel,
              isMarked: data.markParcel,
            };
          }
          return parcel;
        })
      );
    },
  });

  return {
    markParcel: mutate,
    ...rest,
  };
};

export default updateMarkedParcel;
