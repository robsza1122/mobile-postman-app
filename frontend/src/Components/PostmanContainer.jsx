import { useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Loading } from "../Loading/Loading";
import { WorkPage } from "./WorkPage/WorkPage";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { PostManState } from "../PostGlobalProvider";

export const PostmanContainer = () => {
  const {setCurrentUser} = useContext(PostManState);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    window.onpopstate = () => {
      if (window.location.pathname === "/") {
      
      }
    }
  });

  return (
    <>
      {isLoading ? (
        <Loading message="loading dictionaries..." />
      ) : user ? (
        <>
          <WorkPage>
          <Outlet />
          </WorkPage>
        </>
      ) : (
        <Navigate
          to="/"
          replace
          state={{
            redirectUrl: window.location.pathname,
          }}
        />
      )}
    </>
  );
};
