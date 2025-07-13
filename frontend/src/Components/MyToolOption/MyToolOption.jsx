import "./MyToolOption.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteAllDates, logoutUser } from "../../api/api";
import { useContext, useState } from "react";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";

export const MyToolOption = (option) => {
  const { settled, setSettled, setDayIsFinished } = useContext(PostManState);
  const navigate = useNavigate();
  const { mutate: signOut } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("/", {
        replace: true,
      });
    },
  });

  const { mutate: deleteDates } = useMutation({
    mutationFn: deleteAllDates,
    onSuccess: () => {
      navigate("/", {
        replace: true,
      });
      window.location.reload();
    },
    onMutate: () => {
      window.location.reload();
    },
  });

  const [finishedWindow, setFinishedWindow] = useState(false);

  const { header, img, id } = option.option;

  const handleToolOptions = (optionsHeader) => {
    switch (optionsHeader) {
      case "LOGOUT":
        return () =>
          signOut().then((data) => {
            data = undefined;
          });
      case "FINISH WORK":
        return () => {
          if (settled) {
            setFinishedWindow(true);
          }

          return;
        };
    }
  };

  const handleFinishingDay = () => {
    deleteDates();
    setDownloadedBook([]);
    localStorage.clear();
    setFinishedWindow(false);
    setSettled(false);
    setDayIsFinished(true);
    signOut().then((data) => {
      data = undefined;
    });
  };

  const handleLinkOptions = (optionsHeader) => {
    switch (optionsHeader) {
      case "LOGOUT":
        return "/";
      case "START TRAIL WITH BOOK":
        return "/startTrail";
      case "SETTLE":
        return "/settle";
      case "PARCEL ORDER":
        return "/reorderList";
    }
  };

  return (
    <>
      <Link
        className={classNames("mytooloption__content", {
          "mytooloption__content--disabled":
            !settled && header === "FINISH WORK",
        })}
        onClick={handleToolOptions(header)}
        to={handleLinkOptions(header)}
      >
        <h1 className="mytooloption__title">{header}</h1>
        <img src={img} alt={id} className="mytooloption__image" />
      </Link>
      {finishedWindow && (
        <>
          <div className="mytooloption__background"></div>
          <div className="trail__confirmwindow">
            <div className="trail__redblock">
              <p className="trail__downloaderror">FINISH AND LOGOUT</p>
            </div>
            <div className="trail__infocontent trail__infocontent-confirm">
              <div className="trail__infos">
                <p className="trail__info"></p>
                <p className="trail__info">
                  Do you want to finish your work day and close application?
                </p>
              </div>
              <div className="trail__confirmedbuttons">
                <button
                  className="trail__confirmedbutton trail__confirmedbuttonYES"
                  onClick={() => {
                    handleFinishingDay();
                  }}
                >
                  Yes
                </button>
                <button
                  className="trail__confirmedbutton trail__confirmedbuttonNO"
                  onClick={() => setFinishedWindow(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
