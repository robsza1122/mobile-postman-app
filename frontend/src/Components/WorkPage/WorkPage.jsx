import "./WorkPage.scss";
import { WorkNav } from "../WorkNav/WorkNav.jsx";
import { myParcelsOptions, myToolsOptions } from "../../utils/DataProvider.js";
import { MyParcelOption } from "../MyParcelOption/MyParcelOption.jsx";
import { MyToolOption } from "../MyToolOption/MyToolOption.jsx";
import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider.jsx";


export const WorkPage = () => {
  const {slideOptions} = useContext(PostManState);

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
        </div>
      
    </>
  );
};
