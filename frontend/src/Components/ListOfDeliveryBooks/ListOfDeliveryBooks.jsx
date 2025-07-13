import { useContext } from "react";
import { PostManState } from "../../PostGlobalProvider";
import { useState } from "react";
import { deleteDeliveryBook } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import useParcels from "../../hooks/useParcels";

export const ListOfDeliveryBooks = () => {
  const { deliveryBooks, setDeliveryBooks, input, setInput } =
    useContext(PostManState);
  const [openBookNumber, setOpenBookNumber] = useState("");
  const { parcels } = useParcels();
  const queryClient = useQueryClient();

  const { mutate: deleteBook } = useMutation({
    mutationFn: deleteDeliveryBook,
    mutationKey: ["parcels"],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: ["parcels"] });

      const previousParcels = queryClient.getQueriesData(["parcels"]);

      queryClient.setQueryData(["parcels"], (old) => [...old, updatedParcel]);

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["parcels"] }),
  });

  return (
    <div className="createbook__newbooks">
      <h2 className="createbook__maintitle">CREATED DELIVERY BOOK</h2>
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

        const handleOpeningBook = (clickedBook) => {
          console.log(clickedBook);
          console.log(book.numberOfBook);
          if (clickedBook === book.numberOfBook) {
            setOpenBookNumber(clickedBook);
            setInput("");
          }
          if (openBookNumber === clickedBook) {
            setOpenBookNumber("");
          }
        };

        const deleteDeliveryBook = (clickedBook) => {
          console.log(clickedBook);
          deleteBook({ numberOfBook: clickedBook });

          const deleteBookByNumber = deliveryBooks.filter(
            (book) => book.numberOfBook !== clickedBook,
          );

          setDeliveryBooks(deleteBookByNumber);
        };

        return (
          <>
            <div
              className="createbook__newbook"
              onClick={() => handleOpeningBook(book.numberOfBook)}
              key={book.numberOfBook}
            >
              <div className="createbook__container">
                <div className="createbook__infocontainer">
                  <div className="createbook__bookcontent">
                    <p className="createbook__newbooktext">Number of book:</p>{" "}
                    <p className="createbook__newbooknumber">
                      {book.numberOfBook}
                    </p>
                  </div>
                  <div className="createbook__bookcontent">
                    <p className="createbook__newbooktext">
                      Parcel assigned to:
                    </p>
                    <p className="createbook__newbooknumber">{book.username}</p>
                  </div>
                </div>
                <button
                  className="createbook__xbutton"
                  onClick={() => deleteDeliveryBook(book.numberOfBook)}
                >
                  X
                </button>
              </div>
            </div>

            {openBookNumber === book.numberOfBook ? (
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
                      <p className="deliver__number">{parcel.numberOfParcel}</p>
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
  );
};
