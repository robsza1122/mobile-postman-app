import "./WorkPage.scss";
import { WorkNav } from "../WorkNav/WorkNav.jsx";
import { myToolsOptions } from "../../utils/DataProvider.js";
import { MyToolOption } from "../MyToolOption/MyToolOption.jsx";
import { useContext, useEffect } from "react";
import { PostManState } from "../../PostGlobalProvider.jsx";
import { APMOption } from "../APMOption/APMOption.jsx";
import { MyParcelOption } from "../MyParcelOption/MyParcelOption.jsx";
import { MenuServisData } from "../MenuServisData/MenuServisData.jsx";
import useParcels from "../../hooks/useParcels.js";
import useAuth from "../../hooks/useAuth.js";
import { Loading } from "../../Loading/Loading.jsx";

export const WorkPage = () => {
  const { parcels } = useParcels();

  const { slideOptions, downloadedParcels, setDownloadedParcels, currentUser } =
    useContext(PostManState);
  const { isUpdatingParcel } = useContext(PostManState);

  useEffect(() => {
    const handlePop = (e) => {
      if (currentUser && currentUser.username) {
        alert("Click LOGOUT button, if you want move to LoginPage");
        window.history.pushState(null, document.title, window.location.href);
      }
    };
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handlePop);

    return () => {
      window.removeEventListener("popstate", handlePop);
    };
  }, [currentUser]);
  const usersParcels = parcels.filter(
    (parcel) => parcel.forUser === currentUser.username && parcel.isDownloaded,
  );
  const parcelsToDeliver = downloadedParcels.filter(
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

  const myParcelsOptions = [
    {
      id: 1,
      header: "SHOW ALL",
      amount: usersParcels.length,
      title: "DOWNLOADED",
    },
    {
      id: 2,
      header: "ADD OTHERS",
      amount: otherParcels.length,
      title: "ADD TO OTHERS",
    },
    {
      id: 3,
      header: "DELIVER",
      amount: parcelsToDeliver.length,
      title: "TO DELIVERING",
    },
    {
      id: 4,
      header: "ADVICE",
      amount: advicedParcels.length,
      title: "ADVICED",
    },
  ];

  console.log(parcels);
  console.log(downloadedParcels);

  return (
    <>
      <WorkNav />
      <div className="workpage__background"></div>
      <div
        className="workpage__content"
        style={{
          transform: `translateX(${slideOptions}%)`,
          transition: "0.1s ease transform",
        }}
      >
        {isUpdatingParcel && <Loading message="Updating parcel..." />}
        <div className="workpage__options">
          {myParcelsOptions.map((option) => (
            <MyParcelOption option={option} key={option.id} />
          ))}
        </div>
        <div className="workpage__options">
          {myToolsOptions.map((option) => (
            <MyToolOption option={option} key={option.id} />
          ))}
        </div>
        <div className="workpage__options">
          <APMOption />
        </div>
        <div className="workpage__options">
          <MenuServisData />
        </div>
      </div>
    </>
  );
};
