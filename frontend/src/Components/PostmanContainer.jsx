import useAuth from "../hooks/useAuth";
import { Loading } from "../Loading/Loading";
import { WorkPage } from "./WorkPage/WorkPage";
import { LoginPage } from '../Pages/LoginPage/LoginPage';

export const PostmanContainer = () => {
  const { user, isLoading } = useAuth();
  return (
    <>
      {isLoading && <Loading message="loading dictionaries..." />}
      {user ? (
          <WorkPage /> 
      ) : (
        <LoginPage />
      )}
    </>
  );
};
