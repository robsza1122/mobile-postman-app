import "./WorkPage.scss";
import { useMutation } from "@tanstack/react-query";
import { Navigation } from "../../Pages/Navigation/Navigation";
import { logoutUser } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";

export const WorkPage = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("/", {
        replace: true,
      });
    }
  });
  return (
    <>
      <Navigation />
      {isPending && <Loading message="Logging out..." />}
      <div className="workpage__background"></div>
      <Link onClick={() => {
        signOut();
        }} to="/">Sign out</Link>
    </>
  );
};
