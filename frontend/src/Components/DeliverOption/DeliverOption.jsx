import useAuth from "../../hooks/useAuth";
import "./DeliverOption.scss";
import classnames from "classnames";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostManState } from "../../PostGlobalProvider";
import { navOptionsButtons } from "../../utils/DataProvider";
import useParcels from "../../hooks/useParcels";

export const DeliverOption = () => {
  const {
    setDownloadedBook,
    setCurrentParcels,
    downloadedBook,
    currentParcels,
    currentUser,
    settled,
  } = useContext(PostManState);
  const { parcels } = useParcels();

  const navigate = useNavigate();

  useEffect(() => {
    setDownloadedBook(
      downloadedBook.map((parcel) => {
        if (parcel.isMarked) {
          return {
            ...parcel,
            isMarked: false,
            deliveryInput: "",
          };
        }

        return parcel;
      })
    );
    window.onpopstate = () => {
      if (currentParcels.length === 0) {
        navigate("/ML");
      }
      setCurrentParcels([]);
    };
  }, []);
  const [searchInput, setSearchInput] = useState("");

  const parcelsInDelivery = parcels.filter(
    (parcel) => parcel.status[parcel.status.length - 1].name === "IN DELIVERY" &&
    parcel.forUser === currentUser.username
  );
  const advicedParcels = parcels.filter(
    (parcel) => parcel.status[parcel.status.length - 1].name === "ADVICED" &&
    parcel.forUser === currentUser.username
  );
  const otherParcels = parcels.filter(
    (parcel) => parcel.status[parcel.status.length - 1].name === "OTHER" &&
    parcel.forUser === currentUser.username
  );

  const [chosenOption, setChosenOption] = useState(0);
  const [slideOptions, setSlideOptions] = useState(0);
  const getChosenOption = (id) => {
    setChosenOption(id);
    setSlideOptions(id);
  };

  const changeCheckbox = (id) => {
    const changeStatus = downloadedBook.map((currentParcel) => {
      if (currentParcel._id === id) {
        return {
          ...currentParcel,
          isMarked: !currentParcel.isMarked,
        };
      }

      return currentParcel;
    });
    setCurrentParcels(changeStatus.filter((parcel) => parcel.isMarked));
    setDownloadedBook(changeStatus);
  };

  const handleOneDeliveryAlerts = () => {
    const parcelIsMarked = currentParcels.length;
    switch (parcelIsMarked) {
      case 0:
        return alert("No position is marked");
      case 2:
      case 3:
      case 4:
        return alert("More than one position is marked");
    }

    if (currentParcels[0].amountOfTrials === 3) {
      navigate("/traditionalDeliver");
    }
  };

  const handleMultiDeliveryAlerts = () => {
    const parcelIsMarked = currentParcels.length;
    switch (parcelIsMarked) {
      case 0:
        return alert("No position is marked");
      case 1:
        return alert("Mark more than one position");
    }
  };

  const handleLink = () => {
    if (currentParcels.length === 1 && currentParcels[0].amountOfTrials === 3) {
      return "/traditionalDeliver";
    }
    if (currentParcels.length === 1) {
      return "/deliveryCodeScreen";
    }
    return "";
  };

  const handleMultiDeliveryLink = () => {
    if (currentParcels.length === 0 || currentParcels.length === 1) {
      return "";
    } else if (currentParcels.length > 1) {
      return "/multiDeliveryVerification";
    }
  };

  const searchPosition = (positions) => {
    const filterPosition = positions.filter((position) => {
      const searchedText = `${position.name}${position.surname}${position.city}${position.numberOfParcel}${position.adress}${position.postCode}`;
      return searchedText
        .toLowerCase()
        .trim()
        .includes(searchInput.toLowerCase().trim());
    });

    return filterPosition;
  };

  console.log(currentParcels);
  console.log(downloadedBook);
  console.log(parcels);
  return (
    <div className="deliver__content">
      <nav className="deliver__nav">
        <div className="deliver__texts">
          <p className="deliver__text">DELIVERY OPTION</p>
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
      <div className="deliver__menu">
        {navOptionsButtons.map((button, id) => (
          <button
            className={classnames("deliver__option", {
              "deliver__option--active": id === chosenOption,
            })}
            onClick={() => getChosenOption(id)}
            key={id}
          >
            {button}
          </button>
        ))}
        <div
          className="deliver__lineopt"
          style={{
            transform: `translateX(${chosenOption * 100}%)`,
            transition: "0.1s ease transform",
          }}
        ></div>
      </div>
      <div className="deliver__inputcontent">
        <input
          type="text"
          className="deliver__input"
          placeholder="search position..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <img
          src="src/image/magni-glass-black.svg"
          alt=""
          className="deliver__magniglassblack"
        />
      </div>
      <div className="deliver__blockcontents">
        <div className="deliver__blockcontent">
          <div
            className="deliver__block"
            style={{
              transform: `translateX(${slideOptions * -100}%)`,
              transition: "0.1s ease transform",
            }}
          >
            <div className="deliver__todeliverblock">TO DELIVERY</div>
            {settled
              ? ""
              : searchPosition(parcelsInDelivery).map((parcel) => {
                  return (
                    <div className="deliver__position" key={parcel._id}>
                      <div className="deliver__positioncontent">
                        <p className="deliver__number">
                          {parcel.numberOfParcel}
                        </p>
                        <p className="deliver__info">{`${parcel.name} ${parcel.surname}`}</p>
                        <p className="deliver__info">{parcel.adress}</p>
                        <p className="deliver__adress">{`${parcel.city} ${parcel.postCode}`}</p>
                      </div>
                      <div className="deliver__inputcash">
                        <input
                          type="checkbox"
                          className="deliver__checkbox"
                          onClick={() => changeCheckbox(parcel._id)}
                        />
                        {parcel.amount !== 0 && (
                          <p className="deliver__cash">
                            {!parcel.amount.toString().includes(".")
                              ? `${parcel.amount}.00`
                              : `${parcel.amount}`}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            <div className="deliver__advicedblock">ADVICED</div>
            {settled
              ? ""
              : searchPosition(advicedParcels).map((parcel) => (
                  <div className="deliver__position" key={parcel._id}>
                    <div className="deliver__positioncontent">
                      <p className="deliver__number">{parcel.numberOfParcel}</p>
                      <p className="deliver__info">{`${parcel.name} ${parcel.surname}`}</p>
                      <p className="deliver__info">{parcel.adress}</p>
                      <p className="deliver__adress">{`${parcel.city} ${parcel.postCode}`}</p>
                    </div>
                    <div className="deliver__inputcash">
                      <input
                        type="checkbox"
                        className="deliver__checkbox"
                        onClick={() => changeCheckbox(parcel._id)}
                      />
                      {parcel.amount !== 0 && currentParcels.length > 0 && (
                        <p className="deliver__cash">
                          {!currentParcels[0].amount.toString().includes(".")
                            ? `${currentParcels[0].amount}.00`
                            : currentParcels[0].amount}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            <div className="deliver__othersblock">OTHERS</div>
            {settled
              ? ""
              : searchPosition(otherParcels).map((parcel) => (
                  <div className="deliver__position" key={parcel._id}>
                    <div className="deliver__positioncontent">
                      <p className="deliver__number">{parcel.numberOfParcel}</p>
                      <p className="deliver__info">{`${parcel.name} ${parcel.surname}`}</p>
                      <p className="deliver__info">{parcel.adress}</p>
                      <p className="deliver__adress">{`${parcel.city} ${parcel.postCode}`}</p>
                    </div>
                    <div className="deliver__inputcash">
                      <input
                        type="checkbox"
                        className="deliver__checkbox"
                        onClick={() => changeCheckbox(parcel._id)}
                      />
                      {parcel.amount !== 0 && (
                        <p className="deliver__cash">
                          {!parcel.amount.toString().includes(".")
                            ? `${parcel.amount}.00`
                            : `${parcel.amount}`}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
          </div>
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
        </div>
        <div className="deliver__blockcontent">
          <div
            className="deliver__block"
            style={{
              transform: `translateX(${slideOptions * -100}%)`,
              transition: "0.1s ease transform",
            }}
          >
            <div className="deliver__todeliverblock">TO DELIVERY</div>
            <div className="deliver__advicedblock">ADVICED</div>
            <div className="deliver__othersblock">OTHERS</div>
          </div>

          <Link
            className="deliver__buttonZDO"
            to=""
            style={{
              transform: `translateX(${slideOptions * -100}%)`,
              transition: "0.1s ease transform",
            }}
          >
            <p className="deliver__buttontext">Create ZDO to delivery</p>
            <img src="src/image/hand.svg" alt="" className="deliver__img" />
            <img src="src/image/box.svg" alt="" className="deliver__imgbox" />
          </Link>
        </div>
      </div>
    </div>
  );
};
