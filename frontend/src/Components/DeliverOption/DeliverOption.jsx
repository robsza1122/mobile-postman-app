import useAuth from "../../hooks/useAuth";
import "./DeliverOption.scss";
import classnames from "classnames";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostManState } from "../../PostGlobalProvider";

const navButtons = ["INDIVIDUAL", "ZDO"];

export const DeliverOption = (parcelsToDeliver, advicedParcels, otherParcels) => {
  console.log(parcelsToDeliver);
  const {
    downloadedBook,
    setDownloadedBook,
    setCurrentParcels,
    currentParcels,
  } = useContext(PostManState);

  const [chosenOption, setChosenOption] = useState(0);
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
      return "/deliveryCodeScreen";
    }
    return "";
  };
  console.log(currentParcels);
  console.log(downloadedBook);
  return (
    <div className="deliver__content">
      <nav className="deliver__nav">
        <div className="deliver__texts">
          <p className="deliver__text">DELIVERY</p>
          <p className="deliver__user">{`${user.username} [${user.EMINumber}]`}</p>
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
        {navButtons.map((button, id) => (
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
            {parcelsToDeliver.parcelsToDeliver.map((parcel) => {
              return (
                <div className="deliver__position" key={parcel._id}>
                  <div className="deliver__positioncontent">
                    <p className="deliver__number">{parcel.numberOfParcel}</p>
                    <p className="deliver__info">{`${parcel.name} ${parcel.surname}`}</p>
                    <p className="deliver__info">{parcel.adress}</p>
                    <p className="deliver__adress">{`${parcel.city} ${parcel.postCode}`}</p>
                  </div>
                  <input
                    type="checkbox"
                    className="deliver__checkbox"
                    onClick={() => changeCheckbox(parcel._id)}
                  />
                </div>
              );
            })}
            <div className="deliver__advicedblock">ADVICED</div>
            {parcelsToDeliver.advicedParcels.map((parcel) => (
              <>
                <div className="deliver__position" key={parcel._id}>
                  <p className="deliver__number">{parcel.numberOfParcel}</p>
                  <p className="deliver__info">{`${parcel.name} ${parcel.surname}`}</p>
                  <p className="deliver__info">{parcel.adress}</p>
                  <p className="deliver__adress">{`${parcel.city} ${parcel.postCode}`}</p>
                </div>
                <button type="checkbox" className="deliver__checkbox"></button>
              </>
            ))}
            <div className="deliver__othersblock">OTHERS</div>
            {parcelsToDeliver.otherParcels.map((parcel) => (
              <>
                <div className="deliver__position" key={parcel._id}>
                  <p className="deliver__number">{parcel.numberOfParcel}</p>
                  <p className="deliver__info">{`${parcel.name} ${parcel.surname}`}</p>
                  <p className="deliver__info">{parcel.adress}</p>
                  <p className="deliver__adress">{`${parcel.city} ${parcel.postCode}`}</p>
                </div>
                <input type="text" className="deliver__checkbox" />
              </>
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
            <Link className="deliver__button">
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
