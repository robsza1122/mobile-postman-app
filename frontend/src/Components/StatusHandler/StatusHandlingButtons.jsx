import { Link, useNavigate } from "react-router-dom";
import useParcels from "../../hooks/useParcels";



export const StatusHandlingButtons = ({
  slideOptions,
   markedParcels,
  firstButton,
  secondButton,
  firstButtonLink,
  secondButtonLink,
}) => {
      const navigate = useNavigate();
      const {parcels} = useParcels();
      console.log(markedParcels)
      const parcelIsMarked = markedParcels.length;
      const handleOneDeliveryAlerts = () => {
    
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
                              to={firstButtonLink}
                              onClick={() => handleOneDeliveryAlerts()}
                            >
                              <p className="deliver__buttontext">{firstButton}</p>
                              <img src="src/image/hand.svg" alt="" className="deliver__img" />
                              <img src="src/image/box.svg" alt="" className="deliver__imgbox" />
                            </Link>
                            <Link
                              className="deliver__button"
                              to={secondButtonLink}
                              onClick={() => handleMultiDeliveryAlerts()}
                            >
                              <p className="deliver__buttontext">{secondButton}</p>
                              <img src="src/image/boxes.svg" alt="" className="deliver__img" />
                            </Link>
                          </div>
              )
}