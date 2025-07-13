import React, { useContext } from "react";
import "./WorkNavOptions.scss";
import { navButtons } from "../../utils/DataProvider";
import classnames from "classnames";
import { PostManState } from "../../PostGlobalProvider";

export const WorkNavOptions = () => {
  const { setChosenOption, setSlideOptions, chosenOption } =
    useContext(PostManState);
  const getChosenOption = (id) => {
    setChosenOption(id);
    setSlideOptions((id - 1) * -100);
  };

  return (
    <div className="worknavopt__menu">
      {navButtons.map((button) => (
        <button
          className={classnames("worknavopt__option", {
            "worknavopt__option--active": button.id === chosenOption,
          })}
          onClick={() => getChosenOption(button.id)}
          key={button.id}
        >
          {button.name}
        </button>
      ))}
      <div
        className="worknavopt__line"
        style={{
          transform: `translateX(${(chosenOption - 1) * 100}%)`,
          transition: "0.1s ease transform",
        }}
      ></div>
    </div>
  );
};
