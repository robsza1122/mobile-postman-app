import classNames from "classnames";
import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";

type SettleWorkButtonProps = {
    handleSettlingButton: () => void;
    name: string;
}

export const SettleWorkButton = ({ handleSettlingButton, name}: SettleWorkButtonProps) => {
    const { downloadedParcels } = useContext(PostManState);
    return (
        <button
                className={classNames("settle__button", {
                  "settle__button--nopositions": !downloadedParcels,
                })}
                onClick={() => handleSettlingButton()}
              >
                {name}
              </button>
    )
}