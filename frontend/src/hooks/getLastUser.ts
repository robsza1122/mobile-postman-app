import useAuth from "./useAuth";

const getLastUser = () => {
  const { user } = useAuth();
  const lastLogged = user?.data?.username;

  return lastLogged;
};

export default getLastUser;
