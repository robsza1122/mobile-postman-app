import { handleChoosingOptions } from "../../utils/helpers/otherOptionSelection";

export const OtherOptionDetails = ({onChooseDetails, chooseResult}) => {
    return (
        <>
                  <div className="advice__background"></div>
                  <div className="advice__window">
                    {handleChoosingOptions(chooseResult).map((reason) => {
                      console.log(reason);
                      return (
                        <>
                          <button
                            className="advice__button"
                            onClick={() => onChooseDetails(reason)}
                          >
                            {reason}
                          </button>
                        </>
                      );
                    })}
                  </div>
                </>
    )
}