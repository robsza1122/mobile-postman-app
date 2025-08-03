import { useContext } from "react"
import { PostManState } from "../../PostGlobalProvider"
import useParcels from "../../hooks/useParcels";

export const TrailVerifyBook = ({deliveryBookLength, setMarkedBook, markedBook}) => {
    const {parcels} = useParcels();
    const {currentUser} = useContext(PostManState);
    return (
        <div className="trail__verifywindow">
              <div className="trail__verifyinfos">
                <p className="trail__verifyinfo">
                  EMInumber of courier: {currentUser.EMINumber}{" "}
                </p>
                <p className="trail__verifyinfo">
                  Amount of parcel to deliver: {deliveryBookLength}/
                  {parcels.length}
                </p>
                <p className="trail__verifyinfo">
                  parcels to deliver to ZDO: 0
                </p>
                <p className="trail__verifyinfo">
                  parcels with Pocztex Procedure: 0
                </p>
                <p className="trail__verifyinfo">
                  parcels with limited responsiblity: 0
                </p>
              </div>
              <input
                type="checkbox"
                className="trail__checkbox"
                onClick={() => setMarkedBook(!markedBook)}
                checked={markedBook}
              />
            </div>
    )
}