import { useContext } from "react"
import { PostManState } from "../../PostGlobalProvider"

type StatusPanelNavigationProps = {
    title: string;
};

export const StatusPanelNavigation = ({title}: StatusPanelNavigationProps) => {
    const {currentUser} = useContext(PostManState);
    return (
              <nav className="deliver__nav">
        <div className="deliver__texts">
          <p className="deliver__text">{title}</p>
          <p className="deliver__user">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
        </div>
        <div className="deliver__icons">
          <div className="deliver__iconbarcode">
            <img
              className="deliver__code"
              src="src/image/code-white.svg"
              alt=""
            />
            <img
              src="src/image/magni-glass-white.svg"
              alt=""
              className="deliver__magniglasscode"
            />
          </div>
          <div className="deliver__dots">
            <div className="deliver__dot"></div>
            <div className="deliver__dot"></div>
            <div className="deliver__dot"></div>
          </div>
        </div>
      </nav>
    )
}