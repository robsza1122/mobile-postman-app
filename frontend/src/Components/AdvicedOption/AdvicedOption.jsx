import { useContext, useState } from "react";
import { PostManState } from "../../PostGlobalProvider";
import classnames from "classnames";
import { navButtons, navOptionsButtons } from "../../utils/DataProvider";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useParcels from "../../hooks/useParcels";

export const AdvicedOption = () => {
  const {
    setDownloadedBook,
    setCurrentParcels,
    downloadedBook,
    currentParcels,
    currentUser,
    setCurrentUser,
    settled,
  } = useContext(PostManState);
  const [chosenOption, setChosenOption] = useState("");
  const { parcels } = useParcels();
  console.log(settled);

  useEffect(() => {
    setDownloadedBook(
      downloadedBook.map((parcel) => {
        if (parcel.isMarked) {
          return {
            ...parcel,
            isMarked: false,
          };
        }

        return parcel;
      }),
    );
    window.onpopstate = () => {
      if (user) {
        setCurrentUser(user);
      }
      navigate("/ML");
      window.location.reload();
    };
  }, []);
  const [searchInput, setSearchInput] = useState("");

  const parcelsToDeliver = parcels.filter(
    (parcel) =>
      parcel.status[parcel.status.length - 1].name === "IN DELIVERY" &&
      parcel.forUser === currentUser.username,
  );
  const advicedParcels = parcels.filter(
    (parcel) =>
      parcel.status[parcel.status.length - 1].name === "ADVICED" &&
      parcel.forUser === currentUser.username,
  );
  const otherParcels = parcels.filter(
    (parcel) =>
      parcel.status[parcel.status.length - 1].name === "OTHER" &&
      parcel.forUser === currentUser.username,
  );

  const [slideOptions, setSlideOptions] = useState(0);
  const getChosenOption = (id) => {
    setChosenOption(id);
    setSlideOptions(id);
  };
  const { user } = useAuth();

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
  };

  const handleLink = () => {
    if (currentParcels.length === 1) {
      return "/advicingScreen";
    }
    return "";
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

  return (
    <div className="deliver__content">
      <nav className="deliver__nav">
        <div className="deliver__texts">
          <p className="deliver__text">ADVICE SCREEN</p>
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
        {navOptionsButtons.map((name, id) => (
          <button
            className={classnames("deliver__option", {
              "deliver__option--active": id === chosenOption,
            })}
            onClick={() => getChosenOption(id)}
            key={id}
          >
            {name}
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
              : searchPosition(parcelsToDeliver).map((parcel) => {
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
                        {parcel.amount !== 0 && currentParcels.length > 0 && (
                          <p className="deliver__cash">
                            {!currentParcels[0].amount.toString().includes(".")
                              ? `${currentParcels[0].amount}.00`
                              : currentParcels[0].amount}
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
                      {parcel.amount !== 0 && (
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
              : searchPosition(otherParcels).map((parcel) => {
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
                              : parcel.amount}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
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
              <p className="deliver__buttontext">Advice</p>
              <img src="src/image/advice.svg" alt="" className="deliver__img" />
            </Link>
            <Link className="deliver__button">
              <p className="deliver__buttontext">Multi-Advicing</p>
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
