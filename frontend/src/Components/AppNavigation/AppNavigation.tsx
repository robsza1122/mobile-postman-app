type AppNavigationProps = {
  username: string;
  title: string;
  EMINumber: string;
};

export const AppNavigation = ({ username, title, EMINumber }: AppNavigationProps) => {
  return (
    <nav className="booklist__nav">
      <p className="booklist__username">{`${username} [${EMINumber}]`}</p>
        <p className="booklist__text">{title}</p>
      </nav>
  );
};
