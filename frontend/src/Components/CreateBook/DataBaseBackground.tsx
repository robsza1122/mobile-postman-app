import showCurrentUsers from "../../hooks/showAllUsers";

type DataBaseBackgroundProps = {
  showUsersWindow: boolean;
  setAssignedUser: (username: string) => void;
  setShowUsersWindow: (show: boolean) => void;
}

export const DataBaseBackground = ({
  showUsersWindow,
  setAssignedUser,
  setShowUsersWindow,
}: DataBaseBackgroundProps) => {
  const { showUsers } = showCurrentUsers();

  return (
    <>
      {showUsersWindow && <div className="createbook__background"></div>}
      {showUsersWindow && (
        <>
          <div className="createbook__background"></div>
          <div className="createbook__window">
            {showUsers.map((user) => {
              return (
                <button
                  className="createbook__option"
                  onClick={() => {
                    setAssignedUser(user.username);
                    setShowUsersWindow(false);
                  }}
                  value={user.username}
                >
                  {user.username}
                </button>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
