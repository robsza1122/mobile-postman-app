import "./WorkPage.scss";
import { WorkNav } from "../WorkNav/WorkNav.jsx";
import { myToolsOptions } from "../../utils/DataProvider.js";
import { MyToolOption } from "../MyToolOption/MyToolOption.jsx";
import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider.jsx";
import { APMOption } from "../APMOption/APMOption.jsx";
import {MyParcelOption} from "../MyParcelOption/MyParcelOption.jsx"
import { MenuServisData } from "../MenuServisData/MenuServisData.jsx";


export const WorkPage = () => {
  const {slideOptions, downloadedBook} = useContext(PostManState);
  console.log(downloadedBook);
  const parcelsToDeliver = downloadedBook.filter(parcel => parcel.status[parcel.status.length - 1].name === "IN DELIVERY")
const advicedParcels = downloadedBook.filter(parcel => parcel.status[parcel.status.length - 1].name === "ADVICED")
const otherParcels = downloadedBook.filter(parcel => parcel.status[parcel.status.length - 1].name === "OTHERS")

  const myParcelsOptions = [
    {id: 1, header: "SHOW ALL", amount: downloadedBook.length, title: "DOWNLOADED"},
    {id: 2, header: "ADD OTHERS", amount: otherParcels.length, title: "ADD TO OTHERS"},
    {id: 3, header: "DELIVER", amount: parcelsToDeliver.length, title: "TO DELIVERING"},
    {id: 4, header: "ADVICE", amount: advicedParcels.length, title: "ADVICED"},
  ];
  

  return (
    <>
      <WorkNav />
      <div className="workpage__background">
      </div>
        <div 
        className="workpage__content"
        style={{
          transform: `translateX(${slideOptions}%)`, 
          transition: "0.1s ease transform",
        }}>
        <div className="workpage__options">        
        {myParcelsOptions.map(option => (
          <MyParcelOption option={option} key={option.id} />
        ))}
        </div>
        <div className="workpage__options">
        {myToolsOptions.map(option => (
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
