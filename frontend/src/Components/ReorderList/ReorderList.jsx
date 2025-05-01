import useParcels from "../../hooks/useParcels";
import { useContext, useEffect } from "react";
import { PostManState } from "../../PostGlobalProvider";
import "../BookList/BookList.scss";
import "./ReorderList.scss";
import { useState } from "react";
import reorderList from "../../hooks/reorderList.js";

export const ReorderList = () => {
  const { currentUser, downloadedBook, setDownloadedBook } =
    useContext(PostManState);
  const { parcels } = useParcels();
  console.log(parcels);
  const [dragged, setDragged] = useState(null);
  const [mouse, setMouse] = useState([0, 0]);
  const [closestDropZone, setClosestDropZone] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (dragged !== null) {
        event.preventDefault();
        setDragged(null);
        setDownloadedBook(parcel => reorderList(parcel, dragged, closestDropZone))
      }
    };

    document.addEventListener("mouseup", handleMouseMove);
    return () => 
      document.removeEventListener("mouseup", handleMouseMove);
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse([event.x, event.y]);
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (dragged !== null) {
      const elements = Array.from(
        document.getElementsByClassName("reorder__dropzone")
      );
      const positions = elements.map((e) => e.getBoundingClientRect().top);
      const absDifferences = positions.map((v) => Math.abs(v - mouse[1]));
      let result = absDifferences.indexOf(Math.min(...absDifferences));

      if (result > dragged) 
        result += 1;
      
      setClosestDropZone(result);
    }
  }, [dragged, mouse]);


  console.log(dragged)
  console.log(closestDropZone)

  return (
    <>
    <nav className="booklist__nav">
      <p className="booklist__username">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
      <p className="booklist__text">REORDER PARCELS</p>
      </nav>
      <div className="booklist__content">
        {dragged !== null && (
          <div
            className="reorder__floating reorder__listitem"
            style={{
              top: `${mouse[1]}px`,
              left: `${mouse[0]}px`,
              
            }}
          >
            <p className="reorder__item">{downloadedBook[dragged].numberOfParcel}</p>
            <p className="reorder__data">{`${downloadedBook[dragged].name} ${downloadedBook[dragged].surname}`}</p>
            <p className="reorder__data">{`${downloadedBook[dragged].city} ${downloadedBook[dragged].postCode}`}</p>
          </div>
        )}
        <div className="reorder__list">
        <div
        key={`0-dropzone`}
          className={`reorder__listitem reorder__dropzone ${
            dragged === null || closestDropZone !== 0 ? "hidden" : "" 
          }`}
        />
        {downloadedBook.map((parcel, i) => {
          return (
            <>
              {dragged !== i && (
                <>
                  <div
                    key={parcel._id}
                    className="reorder__listitem"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setDragged(i);
                      setClosestDropZone(i);
                    }}
                  >
                    <p className="reorder__item">{parcel.numberOfParcel}</p>
                    <p className="reorder__data">{`${parcel.name} ${parcel.surname}`}</p>
                    <p className="reorder__data">{`${parcel.city} ${parcel.postCode}`}</p>
                  </div>
                  <div
                    key={`${parcel._id}-drop-zone`}
                    className={`reorder__listitem reorder__dropzone ${
                      dragged === null || closestDropZone !== i + 1 ? "hidden" : "" 
                    }`}
                    onMouseUp={(e) => {
                      e.preventDefault();
                    if (dragged !== null) {
                      setDragged(null);
                    }
                    }}
                  ></div>
                </>
              )}
            </>
          );
        })}
        </div>
      </div>
      </>
  );
};
