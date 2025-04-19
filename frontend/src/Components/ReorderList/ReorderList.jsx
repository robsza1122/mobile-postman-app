import useParcels from "../../hooks/useParcels";
import { useContext, useEffect } from "react";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";
import "./ReorderList.scss";
import { useState } from "react";
import reorderList from "../../hooks/reorderList";

export const ReorderList = () => {
  const { downloadedBook, currentUser, setDownloadedBook } =
    useContext(PostManState);
  const { parcels } = useParcels();
  console.log(parcels);
  const [dragged, setDragged] = useState(null);
  const [mouse, setMouse] = useState([0, 0]);
  const [closestDropZone, setClosestDropZone] = useState(0);
  const [items, setItems] = useState([
    // "You asked if",
    // "you could see me",
    // "before I went to",
    // "Spain, you didn't",
    // "give a reason didn't",
    // "know what you would",
    // "say. But I was hoping",
    // "that my breath on your",
    // "face would blow every",
    // "last thing into place"

  ]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (dragged !== null) {
        event.preventDefault();
        setDragged(null);

        setDownloadedBook((parcel) =>
          reorderList(parcel, dragged, closestDropZone)
        );
      }
    };

    document.addEventListener("mouseup", handleMouseMove);
    return () => 
      document.removeEventListener("mouseup", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse([event.clientX, event.clientY]);
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (dragged !== null) {
      const elements = Array.from(
        document.getElementsByClassName("booklist__position")
      );
      const positions = elements.map((e) => e.getBoundingClientRect().top);
      const absDifferences = positions.map((v) => Math.abs(v - mouse[1]));
      let result = absDifferences.indexOf(Math.min(...absDifferences));

      if (result > dragged) {
        result += 1;
      }
      setClosestDropZone(result);
    }
  }, []);

  console.log(typeof ["hey"]);
  console.log(dragged)
  console.log(closestDropZone)

  return (
    <>
    <nav className="booklist__nav">
      <p className="booklist__username">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
      <p className="booklist__text">BOOK LIST</p>
      </nav>
      <div className="booklist__content">
        {dragged !== null && (
          <div
            className="booklist__dragged"
            style={{
              top: `${mouse[1]}px`,
              left: `${mouse[0]}px`,
              
            }}
          >
            {dragged}
          </div>
        )}
        <div
        key={`0-dropzone`}
          className={classNames("booklist__dropzone booklist__position", {
            "booklist__dropzone--hidden":
              dragged === null || closestDropZone !== 0,
          })}
        />
        {downloadedBook.map((parcel, i) => {
          return (
            <>
              {dragged !== i && (
                <>
                  <div
                    className={classNames("booklist__position", {
                      "booklist__position--delivered":
                        parcel.status[parcel.status.length - 1].name ===
                        "DELIVERED",
                      "booklist__position--adviced":
                        parcel.status[parcel.status.length - 1].name ===
                        "ADVICED",
                    })}
                    key={parcel._id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setDragged(i);
                      setClosestDropZone(i);
                    }}
                  >
                    <p
                      className={classNames("booklist__number", {
                        "booklist__number--marked":
                          parcel.status[parcel.status.length - 1].name ===
                          "DELIVERED",
                      })}
                    >
                      {parcel.numberOfParcel}
                    </p>
                    <p
                      className={classNames("booklist__info", {
                        "booklist__info--marked":
                          parcel.status[parcel.status.length - 1].name ===
                          "DELIVERED",
                      })}
                    >{`${parcel.name} ${parcel.surname}`}</p>
                    <p
                      className={classNames("booklist__info", {
                        "booklist__info--marked":
                          parcel.status[parcel.status.length - 1].name ===
                          "DELIVERED",
                      })}
                    >
                      {parcel.adress}
                    </p>
                    <p
                      className={classNames("booklist__adress", {
                        "booklist__adress--marked":
                          parcel.status[parcel.status.length - 1].name ===
                          "DELIVERED",
                      })}
                    >{`${parcel.city} ${parcel.postCode}`}</p>
                  </div>
                  <div
                    key={`${i}-drop-zone`}
                    className={classNames("booklist__dropzone booklist__position", {
                      "booklist__dropzone--hidden":
                        dragged === null || closestDropZone !== 0,
                    })}
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
      </>
  );
};
