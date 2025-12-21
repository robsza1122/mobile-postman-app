import classnames from "classnames";
import {navOptionsButtons} from '../../utils/DataProvider'

export const SwitchingModelPanel = ({ chosenOption, getChosenOption}) => {
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