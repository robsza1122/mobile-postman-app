import useAuth from "../hooks/useAuth";
import { Loading } from "../Loading/Loading";
import { WorkPage } from "./WorkPage/WorkPage";
import { Navigate } from "react-router-dom";

export const PostmanContainer = () => {
  const { user, isLoading } = useAuth();
  return (
    <>
      {isLoading ? 
      (<Loading message="loading dictionaries..." />
      ) : user ? (
          <WorkPage /> 
      ) : (
      
        <Navigate
        to="/login"
        replace
        state={{
          redirectUrl: window.location.pathname,
        }}
        />
      )}
    </>
  );
};
