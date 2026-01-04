import "./statushandler.scss";
import { Link, useNavigate } from "react-router-dom";
import { PostManState } from "../../PostGlobalProvider";
import useParcels from "../../hooks/useParcels";
import { SwitchingModelPanel } from "./SwitchingModelPanel";
import { StatusPanelNavigation } from "./StatusPanelNavigation";
import { StatusHandlingInput } from "./StatusHandlingInput";
import { StatusHandlingList } from "./StatusHandlingList";
import { StatusHandlingButtons } from "./StatusHandlingButtons";
import { StatusHandlingZDOButton } from "./StatusHandlingZDOButton";
import { useContext, useState, useEffect } from "react";

export const StatusHandler = ({
  title,
  firstButton,
  secondButton,
  onFirstButtonClick,
  onSecondButtonClick,
  firstButtonLink,
  secondButtonLink,
}) => {
  const { currentUser, downloadedParcels, setSavePoints } =
    useContext(PostManState);
  const { parcels } = useParcels();

  const markedParcels = downloadedParcels.filter((parcel) => parcel.isMarked);

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

  const [searchInput, setSearchInput] = useState("");
  const [chosenOption, setChosenOption] = useState(0);
  const [slideOptions, setSlideOptions] = useState(0);
  const getChosenOption = (id) => {
    setChosenOption(id);
    setSlideOptions(id);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handlePop = () => {
      const marked = (downloadedParcels || []).some(
        (p) => p.isMarked && p.forUser === currentUser?.username,
      );

      if (!marked) {
        navigate("/workPage");
      }
    };

    // push a history entry so back button triggers popstate here
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handlePop);

    return () => window.removeEventListener("popstate", handlePop);
  }, [downloadedParcels, currentUser, navigate]);

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
      <StatusPanelNavigation title={title} />
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
            onFirstButtonClick={onFirstButtonClick}
            onSecondButtonClick={onSecondButtonClick}
            firstButtonLink={firstButtonLink}
            secondButtonLink={secondButtonLink}
            setSavePoints={setSavePoints}
          />
        </div>
        <div className="deliver__blockcontent">
          <StatusHandlingZDOButton slideOptions={slideOptions} />
        </div>
      </div>
    </div>
  );
};
