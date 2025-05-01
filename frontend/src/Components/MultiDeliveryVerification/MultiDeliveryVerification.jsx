import { useContext } from "react"
import { PostManState } from "../../PostGlobalProvider";
import "./MultiDeliveryVerification.scss";

export const MultiDeliveryVerification = () => {
    const {currentUser} = useContext(PostManState);
    return (
        <div className="mdv">
            <nav className="mdv__nav">
        <p className="mdv__username">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
        <p className="mdv__text">MULTI DELIVERY</p>
      </nav>
        </div>
    )
}