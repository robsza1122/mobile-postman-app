import "./MyToolOption.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../api/api";
import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";
import classNames from "classnames";

export const MyToolOption = (option) => {
  const { settled } = useContext(PostManState);
  const navigate = useNavigate();
  const { mutate: signOut } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("/", {
        replace: true,
      });
    },
  });

  const { header, img, id } = option.option;

  const handleToolOptions = (optionsHeader) => {
    switch (optionsHeader) {
      case "LOGOUT":
        return () =>
          signOut().then((data) => {
            data = undefined;
          });
    }
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
    <Link
      className={classNames("mytooloption__content", {
        "mytooloption__content--disabled": settled && header === "FINISH WORK",
      })}
      onClick={handleToolOptions(header)}
      to={handleLinkOptions(header)}
    >
      <h1 className="mytooloption__title">{header}</h1>
      <img src={img} alt={id} className="mytooloption__image" />
    </Link>
  );
};
