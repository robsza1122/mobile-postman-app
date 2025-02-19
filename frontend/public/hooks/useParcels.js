export const PARCELS = "parcels";
import { useQuery } from "@tanstack/react-query";
import { getParcels } from "../../src/api/api";

const useParcels = (opts = {}) => {
    const {data: parcels = [], ...rest} = useQuery({
      queryKey: [PARCELS],
      queryFn: getParcels,
      ...opts,
    });

    return {sessions, ...rest};
};

export default useParcels;
