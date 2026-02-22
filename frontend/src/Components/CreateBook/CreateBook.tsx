import { useContext, useState } from "react";
import { PostManState } from "../../PostGlobalProvider";
import "./CreateBook.scss";
import useParcels from "../../hooks/useParcels";
import { AppNavigation } from "../AppNavigation/AppNavigation";
import { CreateBookPanel } from "./CreateBookPanel";
import { ListOfDateBaseParcels } from "./ListOfParcelsFromBase";
import { ListOfDeliveryBooks }  from "./ListOfDeliveryBooks";
import { DataBaseBackground } from "./DataBaseBackground";

export const CreateBook = () => {
  const { parcels } = useParcels();

  const { currentUser, deliveryBooks } = useContext(PostManState);
  const [assignedUser, setAssignedUser] = useState("");
  const [showUsersWindow, setShowUsersWindow] = useState(false);

  console.log(parcels);
  console.log(deliveryBooks);
  console.log(assignedUser);

  return (
    <>
      <div className="createbook">
        <AppNavigation
          username={currentUser.username}
          EMINumber={currentUser.EMINumber}
          title="CREATE BOOK"
        />
        <div className="createbook__content">
          <div className="createbook__mainwindow">
            <h2 className="createbook__maintitle">ALL PARCELS IN DATABASE</h2>
            <CreateBookPanel
              assignedUser={assignedUser}
              setShowUsersWindow={setShowUsersWindow}
            />

            <ListOfDateBaseParcels />
            <ListOfDeliveryBooks />
          </div>
        </div>
      </div>
      <DataBaseBackground
        showUsersWindow={showUsersWindow}
        setShowUsersWindow={setShowUsersWindow}
        setAssignedUser={setAssignedUser}
      />
    </>
  );
};
