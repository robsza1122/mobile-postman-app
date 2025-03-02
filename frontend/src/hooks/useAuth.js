import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/api";

export const USER = "user";

const useAuth = (opts = {}) => {
    const {data: user, ...rest} = useQuery({
        queryKey: [USER],
        queryFn: getUser,
        staleTime: Infinity,
        ...opts,
    });

    return {
        user,
        ...rest,
    };
};

export default useAuth;