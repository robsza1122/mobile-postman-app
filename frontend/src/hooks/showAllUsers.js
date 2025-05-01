import { useQuery } from "@tanstack/react-query";
import { showAllUsers } from "../api/api";


export const SHOWUSERS = "showUsers";

const showCurrentUsers = (opts = {}) => {
    const {data: showUsers, ...rest} = useQuery({
        queryKey: [SHOWUSERS],
        queryFn: showAllUsers,
        staleTime: Infinity,
        ...opts,
    });

    return {
        showUsers,
        ...rest,
    };
};

export default showCurrentUsers;