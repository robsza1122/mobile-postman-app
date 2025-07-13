import useAuth from "./useAuth";

const getLastUser = () => {
  const { user } = useAuth();
  const lastLogged = user.toObject().username;

  return lastLogged;
};

export default getLastUser;
