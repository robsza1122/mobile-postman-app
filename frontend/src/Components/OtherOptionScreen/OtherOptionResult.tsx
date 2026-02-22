import { handleChoosingOptions } from "../../utils/helpers/otherOptionSelection";

type OtherOptionResultProps = {
  resultOfDelivery: string[],
  onChooseResult: (result: string) => void,
  onChooseDetails: (details: string) => void
}

export const OtherOptionResult = ({
  resultOfDelivery,
  onChooseResult,
  onChooseDetails,
}: OtherOptionResultProps) => {
  return (
    <>
      <div className="advice__background"></div>
      <div className="advice__window">
        {resultOfDelivery.map((result) => (
          <>
            <button
              className="advice__button"
              onClick={() => {
                onChooseResult(result);
                onChooseDetails(handleChoosingOptions(result)[0]);
              }}
            >
              {result}
            </button>
          </>
        ))}
      </div>
    </>
  );
};
