export const AppNavigation = ({ username, pageName, EMINumber }) => {
  return (
    <nav className="booklist__nav">
      <p className="booklist__username">{`${username} [${EMINumber}]`}</p>
      <p className="booklist__text">{pageName}</p>
    </nav>
  );
};
