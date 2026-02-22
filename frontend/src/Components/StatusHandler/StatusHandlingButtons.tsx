import { Link, useNavigate } from "react-router-dom";
type StatusHandlingButtonsProps = {
  slideOptions: number;
  firstButton: string;
  secondButton: string;
  firstButtonLink: () => string;
  secondButtonLink: () => string;
  onFirstButtonClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  onSecondButtonClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const StatusHandlingButtons = ({
  slideOptions,
  firstButton,
  secondButton,
  firstButtonLink,
  secondButtonLink,
  onFirstButtonClick,
  onSecondButtonClick,
}: StatusHandlingButtonsProps) => {
  const resolveLink = (link: string | (() => string)) => {
    if (!link) return "";
    return typeof link === "function" ? link() : link;
  };

  const firstLink = resolveLink(firstButtonLink);
  const secondLink = resolveLink(secondButtonLink);
  return (
    <div
      className="deliver__buttons"
      style={{
        transform: `translateX(${slideOptions * 100}%)`,
        transition: "0.1s ease transform",
      }}
    >
      <Link
        className="deliver__button"
        to={firstLink}
        onClick={(e) => onFirstButtonClick && onFirstButtonClick(e)}
      >
        <p className="deliver__buttontext">{firstButton}</p>
        <img src="src/image/hand.svg" alt="" className="deliver__img" />
        <img src="src/image/box.svg" alt="" className="deliver__imgbox" />
      </Link>
      <Link
        className="deliver__button"
        to={secondLink}
        onClick={(e) => onSecondButtonClick && onSecondButtonClick(e)}
      >
        <p className="deliver__buttontext">{secondButton}</p>
        <img src="src/image/boxes.svg" alt="" className="deliver__img" />
      </Link>
    </div>
  );
};
