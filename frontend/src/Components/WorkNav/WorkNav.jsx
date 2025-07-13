import "./WorkNav.scss";
import { WorkNavOptions } from "../WorkNavOptions/WorkNavOptions";
import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";

export const WorkNav = () => {
  const { currentUser } = useContext(PostManState);
  return (
    <>
      <div className="worknav__content">
        <div className="worknav__maininfos">
          <p className="worknav__maintext">MAIN SCREEN</p>
          <p className="worknav__user">{`${currentUser.username} [90${currentUser.EMINumber}]`}</p>
        </div>
        <WorkNavOptions />
      </div>
    </>
  );
};
