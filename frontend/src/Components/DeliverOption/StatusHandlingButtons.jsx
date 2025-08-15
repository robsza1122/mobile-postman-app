import { Link, useNavigate } from "react-router-dom";
import useParcels from "../../hooks/useParcels";



export const StatusHandlingButtons = ({slideOptions, markedParcels}) => {
      const navigate = useNavigate();
      const {parcels} = useParcels();
      const handleOneDeliveryAlerts = () => {
    const parcelIsMarked = markedParcels.length;
    switch (parcelIsMarked) {
      case 0:
        return alert("No position is marked");
      case 2:
      case 3:
      case 4:
        return alert("More than one position is marked");
    }

    if (markedParcels[0].amountOfTrials === 3) {
      navigate("/traditionalDeliver");
    }
  };

  const handleMultiDeliveryAlerts = () => {
    const parcelIsMarked = markedParcels.length;
    switch (parcelIsMarked) {
      case 0:
        return alert("No position is marked");
      case 1:
        return alert("Mark more than one position");
    }
  };

  const handleLink = () => {
    if (markedParcels.length === 1 && markedParcels.amountOfTrials === 3) {
      return "/traditionalDeliver";
    }
    if (markedParcels.length === 1) {
      return "/deliveryCodeScreen";
    }
    return "";
  };

  const handleMultiDeliveryLink = () => {
    if (markedParcels.length === 0 || markedParcels.length === 1) {
      return "";
    } else if (markedParcels.length > 1) {
      return "/multiDeliveryVerification";
    }
  };
              return (
                          <div
                            className="deliver__buttons"
                            style={{
                              transform: `translateX(${slideOptions * 100}%)`,
                              transition: "0.1s ease transform",
                            }}
                          >
                            <Link
                              className="deliver__button"
                              to={handleLink()}
                              onClick={() => handleOneDeliveryAlerts()}
                            >
                              <p className="deliver__buttontext">Individual Delivery</p>
                              <img src="src/image/hand.svg" alt="" className="deliver__img" />
                              <img src="src/image/box.svg" alt="" className="deliver__imgbox" />
                            </Link>
                            <Link
                              className="deliver__button"
                              to={handleMultiDeliveryLink()}
                              onClick={() => handleMultiDeliveryAlerts()}
                            >
                              <p className="deliver__buttontext">Multi-delivery</p>
                              <img src="src/image/boxes.svg" alt="" className="deliver__img" />
                            </Link>
                          </div>
              )
}