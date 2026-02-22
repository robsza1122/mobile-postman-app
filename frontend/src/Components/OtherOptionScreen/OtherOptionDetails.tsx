import { handleChoosingOptions } from "../../utils/helpers/otherOptionSelection";

type OtherOptionDetailsProps = {
  onChooseDetails: (details: string) => void,
  chooseResult: string
}

export const OtherOptionDetails = ({onChooseDetails, chooseResult}: OtherOptionDetailsProps) => {
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