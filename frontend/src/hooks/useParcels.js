import { useQuery } from "@tanstack/react-query";
import { getParcels } from "../api/api.js";

export const PARCELS = "parcels";

const useParcels = (opts = {}) => {
  const { data: parcels = [], ...rest } = useQuery({
    queryFn: getParcels,
    queryKey: [PARCELS],
    ...opts,
  });

  return {
    parcels,
    ...rest,
  };
};

export default useParcels;
