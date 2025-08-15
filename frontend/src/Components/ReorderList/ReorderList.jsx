import useParcels, { PARCELS } from "../../hooks/useParcels";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { PostManState } from "../../PostGlobalProvider";
import "../BookList/BookList.scss";
import "./ReorderList.scss";
import { useState } from "react";

function reorderParcels(parcels, fromIndex, toIndex) {
  if (
    fromIndex === null ||
    toIndex === null ||
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= parcels.length ||
    toIndex > parcels.length
  ) {
    return parcels;
  }
  const result = [...parcels];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

export const ReorderList = () => {
  const { currentUser } = useContext(PostManState);
  const { parcels, refetch } = useParcels();
  const [dragged, setDragged] = useState(null);
  const [mouse, setMouse] = useState([0, 0]);
  const [closestDropZone, setClosestDropZone] = useState(0);
  const [localParcels, setLocalParcels] = useState(parcels);

  const queryClient = useQueryClient();

  // Mutation to update order in DB
  const reorderMutation = useMutation(
    async (newOrder) => {
      // Replace with your API endpoint and payload structure
      await fetch("/api/parcels/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parcels: newOrder }),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PARCELS]);
        refetch && refetch();
      },
    }
  );

  // Keep localParcels in sync with parcels from the server
  useEffect(() => {
    setLocalParcels(parcels);
  }, [parcels]);

  useEffect(() => {
    const handleMouseUp = (event) => {
      if (dragged !== null) {
        event.preventDefault();
        setLocalParcels((prev) => {
          const newOrder = reorderParcels(prev, dragged, closestDropZone);
          // Send new order to backend
          reorderMutation.mutate(newOrder);
          return newOrder;
        });
        setDragged(null);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [dragged, closestDropZone, reorderMutation]);

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
        document.getElementsByClassName("reorder__dropzone"),
      );
      const positions = elements.map((e) => e.getBoundingClientRect().top);
      const absDifferences = positions.map((v) => Math.abs(v - mouse[1]));
      let result = absDifferences.indexOf(Math.min(...absDifferences));

      if (result > dragged) result += 1;

      setClosestDropZone(result);
    }
  }, [dragged, mouse]);

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
            <p className="reorder__item">
              {localParcels[dragged].numberOfParcel}
            </p>
            <p className="reorder__data">{`${localParcels[dragged].name} ${localParcels[dragged].surname}`}</p>
            <p className="reorder__data">{`${localParcels[dragged].city} ${localParcels[dragged].postCode}`}</p>
          </div>
        )}
        <div className="reorder__list">
          <div
            key={`0-dropzone`}
            className={`reorder__listitem reorder__dropzone ${
              dragged === null || closestDropZone !== 0 ? "hidden" : ""
            }`}
          />
          {localParcels.map((parcel, i) => {
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
                        dragged === null || closestDropZone !== i + 1
                          ? "hidden"
                          : ""
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
