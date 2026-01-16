import { useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Loading } from "../Loading/Loading";
import { WorkPage } from "./WorkPage/WorkPage";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { PostManState } from "../PostGlobalProvider";
import { MainPage } from "../Pages/MainPage/MainPage";
import { LoginPage } from "../Pages/LoginPage/LoginPage";

export const PostmanContainer = () => {
  const { setCurrentUser, currentUser, isMainPage } = useContext(PostManState);
  const { user, isLoading } = useAuth();
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  console.log(user);
  console.log(currentUser);
  console.log(isMainPage);

  return (
    <>
      {isLoading && (
        <Loading message="loading dictionaries..." />
      )}
      {!user && isMainPage && (
        <MainPage />
      )}
      {!user && !isMainPage && (
        <LoginPage />
      )}
      {user && (
        <WorkPage>
          <Outlet />
        </WorkPage>
      )}
    </>
  );
};
