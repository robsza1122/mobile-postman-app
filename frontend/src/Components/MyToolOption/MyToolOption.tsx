import "./MyToolOption.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteAllDates, logoutUser } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";
import useAuth from "../../hooks/useAuth";
import { Loading } from "../../Loading/Loading";

type MyToolOptionProps = {
  option: {
    header: string;
    img: string;
    id: number;
  };
}

export const MyToolOption = ({option}: MyToolOptionProps) => {
  const { settled, setSettled, setDayIsFinished, setIsMainPage, setDownloadedParcels } = useContext(PostManState);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: signOut, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setIsMainPage(true);
      navigate("/", {
        replace: true,
      });
    },
  });

  console.log(user);

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
  const [logoutWindow, setLogoutWindow] = useState(false);

  const { header, img, id } = option;

  const handleToolOptions = (optionsHeader: string) => {
    switch (optionsHeader) {
      case "LOGOUT":
        return () => {
          setLogoutWindow(true);
        }
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
    setDownloadedParcels([]);
    localStorage.clear();
    setFinishedWindow(false);
    setSettled(false);
    setDayIsFinished(true);
  };

  const handleSignOut = () => {
    //@ts-ignore
      signOut().then(data => data = undefined);
    setLogoutWindow(false);
  }

  const handleLinkOptions = (optionsHeader: string) => {
    switch (optionsHeader) {
      case "LOGOUT":
        return "/";
      case "START TRAIL WITH BOOK":
        return "/startTrail";
      case "SETTLE":
        return "/settle";
      case "PARCEL ORDER":
        return "/reorderList";
        default:
          return "#";
    }
  };

  return (
    <>
    {isPending && <Loading message="Logging out..." />}
      <Link
        className={classNames("mytooloption__content", {
          "mytooloption__content--disabled":
            !settled && header === "FINISH WORK",
        })}
        onClick={handleToolOptions(header)}
        to={handleLinkOptions(header)}
      >
        <h1 className="mytooloption__title">{header}</h1>
        <img src={img} alt={String(id)} className="mytooloption__image" />
      </Link>
      {finishedWindow && (
        <>
          <div className="mytooloption__background"></div>
          <div className="trail__confirmwindow">
            <div className="trail__redblock">
              <p className="trail__downloaderror">FINISH WORK AND SETTLE PARCELS</p>
            </div>
            <div className="trail__infocontent trail__infocontent-confirm">
              <div className="trail__infos">
                <p className="trail__info"></p>
                <p className="trail__info">
                  Do you want to finish your work day and settle parcels?
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
       {logoutWindow && (
        <>
          <div className="mytooloption__background"></div>
          <div className="trail__confirmwindow">
            <div className="trail__redblock">
              <p className="trail__downloaderror">LOGOUT</p>
            </div>
            <div className="trail__infocontent trail__infocontent-confirm">
              <div className="trail__infos">
                <p className="trail__info"></p>
                <p className="trail__info">
                  Do you want to logout from application?
                </p>
              </div>
              <div className="trail__confirmedbuttons">
                <Link
                  className="trail__confirmedbutton trail__confirmedbuttonYES trail__confirmedbutton--link"
                  onClick={() => handleSignOut()}
                  to="/"
                >
                  Yes
                </Link>
                <button
                  className="trail__confirmedbutton trail__confirmedbuttonNO"
                  onClick={() => setLogoutWindow(false)}
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
