import { Link } from "react-router-dom";

import "./MyParcelOption.scss";
import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";

export const MyParcelOption = (option) => {
  const { downloadedBook } = useContext(PostManState);
  const { header, title, amount } = option.option;
  console.log(option.option.header);
  const handleRouterLinks = (chosenLink) => {
    switch (chosenLink) {
      case "DELIVER":
        return "/deliverOption";
      case "SHOW ALL":
        return "/booklist";
      case "ADD OTHERS":
        return "/otherOption";
      case "ADVICE":
        return "/advicedOption";
    }
  };

  console.log(handleRouterLinks(header));

  return (
    <Link className="parceloption__content" to={handleRouterLinks(header)}>
      <h1 className="parceloption__header">{header}</h1>
      <p className="parceloption__amount">{amount}</p>
      <p className="parceloption__title">{title}</p>
    </Link>
  );
};
