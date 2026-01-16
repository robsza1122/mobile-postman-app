import { useContext } from "react";
import { AppNavigation } from "../AppNavigation/AppNavigation";
import { PostManState } from "../../PostGlobalProvider";

export const TrailNavigation = () => {
    const {currentUser} = useContext(PostManState);
    return (
                <nav className="trail__nav">
                  <div className="trail__navcontent">
                    <AppNavigation
                      username={currentUser.username}
                      EMINumber={currentUser.EMINumber}
                      pageName={"TRAIL OPTION"}
                    />
                    <div className="trail__icons">
                      <div className="trail__iconcontainer">
                        <img
                          className="trail__barcode"
                          src="src/image/barcode.svg"
                          alt="barcode"
                        />
                        <img
                          src="src/image/magni-glass-white.svg"
                          alt=""
                          className="trail__magniglass"
                        />
                      </div>
                      <div className="trail__iconcontainer">
                        <img
                          className="trail__code"
                          src="src/image/code-white.svg"
                          alt=""
                        />
                        <img
                          src="src/image/magni-glass-white.svg"
                          alt=""
                          className="trail__magniglasscode"
                        />
                      </div>
                      <div className="trail__dots">
                        <div className="trail__dot"></div>
                        <div className="trail__dot"></div>
                        <div className="trail__dot"></div>
                      </div>
                    </div>
                  </div>
                </nav>
    )
}