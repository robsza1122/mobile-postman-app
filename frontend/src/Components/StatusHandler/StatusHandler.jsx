import useAuth from "../../hooks/useAuth";
import "./statushandler.scss";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { PostManState } from "../../PostGlobalProvider";
import useParcels, { PARCELS } from "../../hooks/useParcels";
import { SwitchingModelPanel } from "./SwitchingModelPanel";
import { StatusPanelNavigation } from "./StatusPanelNavigation";
import { StatusHandlingInput } from "./StatusHandlingInput";
import { StatusHandlingList } from "./StatusHandlingList";
import { StatusHandlingButtons } from "./StatusHandlingButtons";
import { StatusHandlingZDOButton } from "./StatusHandlingZDOButton";
import { useMutation } from "@tanstack/react-query";
import { markAllOnFalse } from "../../api/api";
import { useContext, useState, useEffect, useCallback } from "react";

export const StatusHandler = ({
  title,
  firstButton,
  secondButton,
  firstButtonLink,
  secondButtonLink
}) => {
  const { currentUser, downloadedParcels, setDownloadedParcels } =
    useContext(PostManState);
  const { parcels } = useParcels();

  const markedParcels = downloadedParcels.filter((parcel) => parcel.isMarked);

  const [searchInput, setSearchInput] = useState("");

  const inDeliveryParcels = downloadedParcels.filter(
    (parcel) =>
      parcel.status[parcel.status.length - 1].name === "IN DELIVERY" &&
      parcel.forUser === currentUser.username,
  );

  const advicedParcels = downloadedParcels.filter(
    (parcel) =>
      parcel.status[parcel.status.length - 1].name === "ADVICED" &&
      parcel.forUser === currentUser.username,
  );
  const otherParcels = downloadedParcels.filter(
    (parcel) =>
      parcel.status[parcel.status.length - 1].name === "OTHER" &&
      parcel.forUser === currentUser.username,
  );

  const [chosenOption, setChosenOption] = useState(0);
  const [slideOptions, setSlideOptions] = useState(0);
  const getChosenOption = (id) => {
    setChosenOption(id);
    setSlideOptions(id);
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

  console.log(downloadedParcels);
  console.log(parcels);

  return (
    <div className="deliver__content">
      <StatusPanelNavigation 
      title={title} />
      <div className="deliver__menu">
        <SwitchingModelPanel
          chosenOption={chosenOption}
          setChosenOption={setChosenOption}
          getChosenOption={getChosenOption}
        />
        <div
          className="deliver__lineopt"
          style={{
            transform: `translateX(${chosenOption * 100}%)`,
            transition: "0.1s ease transform",
          }}
        ></div>
      </div>
      <StatusHandlingInput
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <div className="deliver__blockcontents">
        <div className="deliver__blockcontent">
          <div
            className="deliver__block"
            style={{
              transform: `translateX(${slideOptions * -100}%)`,
              transition: "0.1s ease transform",
            }}
          >
            <StatusHandlingList
              title="TO DELIVERY"
              visibleParcels={inDeliveryParcels}
              searchPosition={searchPosition}
              statusType="IN DELIVERY"
            />

            <StatusHandlingList
              title="ADVICED"
              visibleParcels={advicedParcels}
              searchPosition={searchPosition}
              statusType="ADVICED"
            />
            <StatusHandlingList
              title="OTHERS"
              visibleParcels={otherParcels}
              searchPosition={searchPosition}
              statusType="OTHERS"
            />
          </div>
          <StatusHandlingButtons
            slideOptions={slideOptions}
            markedParcels={markedParcels}
            firstButton={firstButton}
            secondButton={secondButton}
            firstButtonLink={firstButtonLink}
            secondButtonLink={secondButtonLink}
          />
        </div>
        <div className="deliver__blockcontent">
          <StatusHandlingZDOButton slideOptions={slideOptions} />
        </div>
      </div>
    </div>
  );
};
