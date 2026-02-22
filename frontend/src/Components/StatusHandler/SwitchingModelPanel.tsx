import classnames from "classnames";
import { navOptionsButtons } from '../../utils/DataProvider'

type SwitchingModelPanelProps = {
  chosenOption: number;
  getChosenOption: (option: number) => void;
}

export const SwitchingModelPanel = ({ chosenOption, getChosenOption }: SwitchingModelPanelProps) => {
  return (
    <>
      {navOptionsButtons.map((button, id) => (
        <button
          className={classnames("deliver__option", {
            "deliver__option--active": id === chosenOption,
          })}
          onClick={() => getChosenOption(id)}
          key={id}
        >
          {button}
        </button>
      ))}
    </>
  )
}