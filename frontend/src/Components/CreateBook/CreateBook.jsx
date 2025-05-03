import { useContext, useEffect, useState } from "react";
import { PostManState } from "../../PostGlobalProvider";
import "./CreateBook.scss";
import useParcels from "../../hooks/useParcels";
import classNames from "classnames";
import makeDifferentNumbers from "../../hooks/createDifferentNumbers";
import showCurrentUsers from "../../hooks/showAllUsers";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { assignParcelsToUser, deleteDeliveryBook, markAllOnFalse, markAllOnTrue, markParcel } from "../../api/api";
import { useQueryClient } from "@tanstack/react-query";

export const CreateBook = () => {
  const { parcels } = useParcels();
  const { showUsers } = showCurrentUsers();
  const { user } = useAuth();

  const {
    downloadedBook,
    currentUser,
    deliveryBooks,
    setDeliveryBooks,
    parcelsInDatabase,
    setParcelsInDatabase,
    setInput,
    input,
    showAllCurrentUsers,
    setShowAllCurrentUsers,
  } = useContext(PostManState);
  const [assignedUser, setAssignedUser] = useState("");
  const [openBookNumber, setOpenBookNumber] = useState("");
  const [showUsersWindow, setShowUsersWindow] = useState(false);
  const allAreChecked =
    parcelsInDatabase.filter((parcel) => parcel.isMarked).length ===
    parcelsInDatabase.length;

  useEffect(() => {
    if (showUsers) {
      setShowAllCurrentUsers(showUsers);
    }
  }, []);

  const queryClient = useQueryClient();
  const { mutate: markClickedParcel } = useMutation({
    mutationFn: markParcel,
    mutationKey: ["parcels"],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: ["parcels"] });

      const previousParcels = queryClient.getQueriesData(["parcels"]);

      queryClient.setQueryData(["parcels"], (old) => [...old, updatedParcel]);

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["parcels"] }),
  });

  const {mutate: markOnTrue} = useMutation({
    mutationFn: markAllOnTrue,
    mutationKey: ["parcels"],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: ["parcels"] });

      const previousParcels = queryClient.getQueriesData(["parcels"]);

      queryClient.setQueryData(["parcels"], (old) => [...old, updatedParcel]);

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["parcels"] }),
  });

  const {mutate: markOnFalse} = useMutation({
    mutationFn: markAllOnFalse,
    mutationKey: ["parcels"],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: ["parcels"] });

      const previousParcels = queryClient.getQueriesData(["parcels"]);

      queryClient.setQueryData(["parcels"], (old) => [...old, updatedParcel]);

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["parcels"] }),
  })

  const {mutate: assignParcels} = useMutation({
    mutationFn: assignParcelsToUser,
    mutationKey: ["parcels"],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: ["parcels"] });

      const previousParcels = queryClient.getQueriesData(["parcels"]);

      queryClient.setQueryData(["parcels"], (old) => [...old, updatedParcel]);

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["parcels"] }),
  })
  const {mutate: deleteBook} = useMutation({
    mutationFn: deleteDeliveryBook,
    mutationKey: ["parcels"],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: ["parcels"] });

      const previousParcels = queryClient.getQueriesData(["parcels"]);

      queryClient.setQueryData(["parcels"], (old) => [...old, updatedParcel]);

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["parcels"] }),
  })

  const handleTogglingParcels = () => {
    setParcelsInDatabase(
      parcelsInDatabase.map((parcel) => {
        if (allAreChecked && !parcel.isBooked) {
          markOnFalse();
          return {
            ...parcel,
            isMarked: false,
          };
        }
        if (!allAreChecked && !parcel.isBooked) {
          markOnTrue();
          return {
            ...parcel,
            isMarked: true,
          };
        }

        return parcel;
      })
    );
  };

  const handleAddingButton = () => {
    const { numberOfDeliveryBook } = makeDifferentNumbers(8);
    if (assignedUser === "") {
      alert("Please choose user firstly.");

      return;
    }
    if (parcelsInDatabase.filter((parcel) => parcel.isMarked).length === 0) {
      alert("Nothing is added to the book.");

      return;
    }

    const changeStatus = parcelsInDatabase.map((parcel) => {
      if (parcel.isMarked) {
        assignParcels({
          numberOfBook: numberOfDeliveryBook,
          username: assignedUser,
        })
        return {
          ...parcel,
          isMarked: false,
          isBooked: true,
          forUser: assignedUser,
          numberOfBook: numberOfDeliveryBook,
        };
      }
      return parcel;
    });

    const addToBook = {
      number: numberOfDeliveryBook,
      parcels: changeStatus.filter(parcel => parcel.isBooked && parcel.forUser === assignedUser && parcel.numberOfBook === numberOfDeliveryBook)
    };

    setParcelsInDatabase(changeStatus);

    setDeliveryBooks([...deliveryBooks, addToBook]);
  };

  const handleFindingParcels = (foundParcels) => {
    return foundParcels.filter((parcel) => {
      const searchedText = `${parcel.name} ${parcel.surname} ${parcel.numberOfParcel} ${parcel.city} ${parcel.postCode} ${parcel.adress}`;

      return searchedText
        .toLowerCase()
        .trim()
        .includes(input.toLowerCase().trim());
    });
  };

  console.log(showAllCurrentUsers);
  console.log(parcels);
  console.log(parcelsInDatabase);
  console.log(allAreChecked);
  console.log(deliveryBooks);
  console.log(openBookNumber);
  console.log(assignedUser);

  return (
    <>
      <div className="createbook">
        <nav className="booklist__nav">
          <p className="booklist__username">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
          <p className="booklist__text">CREATE BOOK</p>
        </nav>
        <div className="createbook__content">
          <div className="createbook__mainwindow">
            <h2 className="createbook__maintitle">ALL PARCELS IN DATABASE</h2>
            <div className="createbook__inputcontent">
              <input
                type="text"
                className="createbook__find"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="find parcel..."
              />
              <img
                src="src/image/magni-glass-black.svg"
                alt=""
                className="createbook__glass"
              />
            </div>
            <div className="createbook__buttons">
              <button
                className="createbook__button"
                onClick={() => handleTogglingParcels()}
              >
                Toggle all parcels
              </button>

              <button
                className="createbook__button"
                onClick={() => handleAddingButton()}
              >
                Create delivery book
              </button>
              <div className="createbook__useroptions">
                <p className="createbook__userinfo">Choose user:</p>
                <button
                  className="createbook__choosenUser"
                  onClick={() => setShowUsersWindow(true)}
                >
                  {!assignedUser ? "Choose user" : assignedUser}
                </button>
              </div>
            </div>

            <div className="createbook__listofparcels">
              {handleFindingParcels(parcelsInDatabase).map((parcel) => {
                const handleAddingParcelToBook = (parcelsId) => {
                  const changeChecking = parcelsInDatabase.map((parcel) => {
                    if (parcel._id === parcelsId) {
                      markClickedParcel({
                        markParcel: !parcel.isMarked,
                        id: parcelsId,
                      });

                      return {
                        ...parcel,
                        isMarked: !parcel.isMarked,
                      };
                    }
                    return parcel;
                  });
                  setParcelsInDatabase(changeChecking);
                };
                const handleText = () => {
                  if (parcel.isBooked) {
                    return "PARCEL BOOKED";
                  } else if (!parcel.isBooked && !parcel.isMarked) {
                    return "ADD";
                  } else if (!parcel.isBooked && parcel.isMarked) {
                    return "REMOVE";
                  } else {
                    return "ERROR";
                  }
                };

                return (
                  <div
                    className="deliver__position"
                    key={parcel._id}
                    style={{
                      background: `${
                        handleText() === "PARCEL BOOKED"
                          ? "rgba(0, 0, 0, 0.06)"
                          : ""
                      }`,
                    }}
                  >
                    <div className="deliver__positioncontent">
                      <p className="deliver__number">{parcel.numberOfParcel}</p>
                      <p className="deliver__info">{`${parcel.name} ${parcel.surname}`}</p>
                      <p className="deliver__info">{parcel.adress}</p>
                      <p className="deliver__adress">{`${parcel.city} ${parcel.postCode}`}</p>
                    </div>
                    <div className="createbook__add">
                      <p className="createbook__addedtext">{handleText()}</p>
                      {!parcel.isBooked && (
                        <input
                          type="checkbox"
                          className={classNames("createbook__checkbox", {
                            "createbook__checkbox--checked": parcel.isMarked,
                          })}
                          value={parcel.isMarked}
                          onClick={() => {
                            handleAddingParcelToBook(parcel._id);
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="createbook__newbooks">
              <h2 className="createbook__maintitle">CREATED DELIVERY BOOK</h2>
              {parcelsInDatabase.length === 0 && (
                <button
                  className="createbook__download"
                  onClick={() => setParcelsInDatabase(parcels)}
                >
                  DOWNLOAD PARCELS!!!
                </button>
              )}
              {deliveryBooks.map((book) => {
                const handleFindingParcelsInBook = () => {
                  return book.parcels.filter((parcel) => {
                    const searchedText = `${parcel.name} ${parcel.surname} ${parcel.numberOfParcel} ${parcel.city} ${parcel.postCode} ${parcel.adress} ${parcel.numberOfBook}`;

                    return searchedText
                      .toLowerCase()
                      .trim()
                      .includes(input.toLowerCase().trim());
                  });
                };

                const handleRemovingBook = (clickedNumber) => {
                  deleteBook({
                    numberOfBook: clickedNumber,
                    username: book.parcels[0].forUser,
                  })
                  setDeliveryBooks(
                    deliveryBooks.filter(
                      (book) => book.number !== clickedNumber
                    )
                  );
                  setParcelsInDatabase(
                    parcelsInDatabase.map((parcel) => {
                      if (
                        parcel.isBooked &&
                        parcel.numberOfBook === book.number
                      ) {
                        return {
                          ...parcel,
                          isBooked: false,
                          forUser: "",
                          numberOfBook: "",
                        };
                      }

                      return parcel;
                    })
                  );
                };

                const handleOpeningBook = (clickedBook) => {
                  console.log(clickedBook);
                  console.log(book.number);
                  if (clickedBook === book.number) {
                    setOpenBookNumber(clickedBook);
                    setInput("");
                  }
                  if (openBookNumber && clickedBook === book.number) {
                    setOpenBookNumber("");
                    setInput("");
                  }
                };

                return (
                  <>
                    <div
                      className="createbook__newbook"
                      onClick={() => handleOpeningBook(book.number)}
                      key={book.number}
                    >
                      <div className="createbook__container">
                        <div className="createbook__infocontainer">
                          <div className="createbook__bookcontent">
                            <p className="createbook__newbooktext">
                              Number of book:
                            </p>{" "}
                            <p className="createbook__newbooknumber">
                              {book.number}
                            </p>
                          </div>
                          <div className="createbook__bookcontent">
                            <p className="createbook__newbooktext">
                              Parcel assigned to:
                            </p>
                            <p className="createbook__newbooknumber">
                              {book.parcels[0].forUser}
                            </p>
                          </div>
                        </div>
                        {!downloadedBook.find(
                          (parcel) => parcel.numberOfBook === book.number
                        ) && (
                          <button
                            className="createbook__removebook"
                            onClick={() => handleRemovingBook(book.number)}
                          >
                            X
                          </button>
                        )}
                      </div>
                      {downloadedBook.find(
                        (parcel) => parcel.numberOfBook === book.number
                      ) && <p className="createbook__info">BOOK DOWNLOADED</p>}
                    </div>
                    {openBookNumber === book.number ? (
                      <div className="createbook__openedbookcontent">
                        <div className="createbook__inputcontent">
                          <input
                            type="text"
                            className="createbook__find"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="find parcel..."
                          />
                          <img
                            src="src/image/magni-glass-black.svg"
                            alt=""
                            className="createbook__glass"
                          />
                        </div>

                        {handleFindingParcelsInBook().map((parcel) => {
                          return (
                            <div
                              className="deliver__positioncontent"
                              style={{
                                border: "1px solid gray",
                              }}
                              key={parcel._id}
                            >
                              <p className="deliver__number">
                                {parcel.numberOfParcel}
                              </p>
                              <p className="deliver__info">{`${parcel.name} ${parcel.surname}`}</p>
                              <p className="deliver__info">{parcel.adress}</p>
                              <p className="deliver__adress">{`${parcel.city} ${parcel.postCode}`}</p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {showUsersWindow && <div className="createbook__background"></div>}
      {showUsersWindow && (
        <>
          <div className="createbook__background"></div>
          <div className="createbook__window">
            {showAllCurrentUsers.map((user) => {
              return (
                <>
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
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
