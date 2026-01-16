import "./TrailOption.scss";
import useParcels, { PARCELS } from "../../hooks/useParcels.js";
import { useContext, useState } from "react";
import { Loading } from "../../Loading/Loading.jsx";
import { Link, useNavigate } from "react-router-dom";
import { PostManState } from "../../PostGlobalProvider.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getInDeliveryStatus,
} from "../../api/api.js";
import { TrailConfirmBook } from "./TrailConfirmBook.js";
import { TrailConfirmBookError } from "./TrailConfirmBookError.jsx";
import { TrailVerifyBook } from "./TrailVerifyBook.jsx";
import { TrailNavigation } from "./TrailNavigation.jsx";
import { TrailInput } from "./TrailInput.jsx";
import { TrailButtons } from "./TrailButtons.js";
import { date } from "../../utils/currentDate.js";
import useAuth from "../../hooks/useAuth.js";
import { CreateParcelOrder } from "../../types/parcel.type.js";

export const TrailOption = () => {
  const {
    clearBook,
    currentUser,
    deliveryBooks,
    setDownloadedParcels,
    downloadedParcels,
    setDayIsFinished,
    setSettled,
  } = useContext(PostManState);
  const [parcelsNumber, setParcelsNumber] = useState("");
  const [openBook, setOpenBook] = useState(false);
  const [showError, setShowError] = useState(false);
  const { parcels, isLoading } = useParcels();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState("");
  const [verifyBook, setVerifyBook] = useState(false);
  const [markedBook, setMarkedBook] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: inDeliveryStatus } = useMutation({
    mutationFn: getInDeliveryStatus,
    mutationKey: [PARCELS],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData({ queryKey: [PARCELS] });

      queryClient.setQueryData([PARCELS], (old: CreateParcelOrder[] | undefined) => [...(old || []), updatedParcel]);

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

  const typedParcelBookNumber = (Array.isArray(parcels) ? parcels : parcels?.data || []).find(
    (parcel: CreateParcelOrder) => parcel.numberOfParcel === parcelsNumber,
  )?.numberOfBook;

  const deliveryBookLength = (Array.isArray(parcels) ? parcels : parcels?.data || []).filter(
    (parcel: CreateParcelOrder) => parcel.numberOfBook === typedParcelBookNumber,
  ).length;
  const typedParcel = (Array.isArray(parcels) ? parcels : parcels?.data || []).find(
    (parcel: CreateParcelOrder) => parcel.numberOfParcel === parcelsNumber,
  );
  console.log(user);
  console.log(currentUser);

  const onSubmit = async () => {
    setLoading(true);
    setLoadingText("Looking for books...");
    setTimeout(() => {
      setLoading(false);
      setLoadingText("");
    }, 1000);

    if (parcelsNumber.trim() === "") {
      alert("Please enter a parcel number");
      setLoading(false);
      return;
    }

    if (typedParcel.forUser === "") {
      alert("Parcel is not assigned to any user");
      setParcelsNumber("");

      return;
    }

    if (typedParcel.forUser !== currentUser.username) {
      alert("Parcel is assigned to other user");
      setParcelsNumber("");

      return;
    }

    if (typedParcel.isDownloaded) {
      alert("Book is already downloaded");
      setParcelsNumber("");

      return;
    }

    if (verifyBook && !markedBook) {
      alert("No book is choosen.");
      return;
    }

    if (markedBook) {
      inDeliveryStatus({
        numberOfBook: typedParcelBookNumber,
        username: typedParcel.forUser,
        createdAt: date,
      });

      setDownloadedParcels([
        ...downloadedParcels,
        ...(Array.isArray(parcels) ? parcels : parcels?.data || [])
          .map((parcel: CreateParcelOrder) => {
            if (parcel.numberOfBook === typedParcelBookNumber) {
              return {
                ...parcel,
                isDownloaded: true,
                noAddressee: false,
                status: [
                  ...(Array.isArray(parcel.status) ? parcel.status : []),
                  {
                    name: "IN DELIVERY",
                    createdAt: date,
                    subject: "",
                    details: "",
                    signature: null,
                    isDeliveryCode: false,
                    isSignature: false,
                    deliveryInput: "",
                    reasonOfAdvice: "",
                    officeOfAdvice: "",
                    placeOfNotification: "",
                  },
                ],
              };
            }
            return parcel;
          })
          .filter((parcel: CreateParcelOrder) => parcel.numberOfBook === typedParcelBookNumber),
      ]);

      navigate("/booklist");
    }

    if (
      (Array.isArray(parcels) ? parcels : parcels?.data || []).find(
        (parcel: CreateParcelOrder) => parcel.numberOfParcel === parcelsNumber && !parcel.isBooked,
      )
    ) {
      alert("Parcel is not added to any book.");
      setParcelsNumber("");

      return;
    }

    if (typedParcel === undefined) {
      alert("Wrong number of parcel");
      setParcelsNumber("");

      return;
    }

    if ((Array.isArray(parcels) ? parcels : parcels?.data || []).find((parcel: CreateParcelOrder) => parcel.numberOfParcel === parcelsNumber)) {
      setOpenBook(true);
    }
  };

  const onReset = () => {
    if (verifyBook) {
      setLoading(true);
      setLoadingText("Removing book...");
      setTimeout(() => {
        setLoading(false);
        setLoadingText("");
      }, 1000);
      setOpenBook(false);
      setVerifyBook(false);
      setMarkedBook(false);
      setParcelsNumber("");
    }
    setOpenBook(false);
    setParcelsNumber("");
  };

  console.log(parcels);
  console.log(downloadedParcels)

  return (
    <>
      <div className="trail__body">
        <TrailNavigation />
        {isLoading && <Loading message="Loading parcels..." />}

        <div className="trail__content">
          <TrailInput
            parcelsNumber={parcelsNumber}
            setParcelsNumber={setParcelsNumber}
            onSubmit={onSubmit}
          />
          <button onClick={() => {
            clearBook();
            setDownloadedParcels([]);
          }}>Clear book</button>
          <Link to="/createBook" className="trail__createbook">
            Add parcels to book
          </Link>
          {verifyBook && (
            <TrailVerifyBook
              deliveryBookLength={deliveryBookLength}
              setMarkedBook={setMarkedBook}
              markedBook={markedBook}
            />
          )}
          {!openBook && !verifyBook && (
            <>
              <p className="trail__noposition">No positions</p>
              <div className="trail__line"></div>
            </>
          )}
          <TrailButtons
            openBook={openBook}
            showError={showError}
            verifyBook={verifyBook}
            markedBook={markedBook}
            onSubmit={onSubmit}
            onReset={onReset}
          />
        </div>
        <>
          {!loading && openBook && (
            <TrailConfirmBook
              parcelsNumber={parcelsNumber}
              deliveryBookLength={deliveryBookLength}
              setOpenBook={setOpenBook}
              setParcelsNumber={setParcelsNumber}
              typedParcelBookNumber={typedParcelBookNumber}
              setLoading={setLoading}
              setLoadingText={setLoadingText}
              setVerifyBook={setVerifyBook}
            />
          )}
        </>
        {loading && (
          <>
            <div className="trail__confirmBook"></div>
            <Loading message={loadingText} />
          </>
        )}
        {showError && !loading && (
          <TrailConfirmBookError
            setShowError={setShowError}
            setParcelsNumber={setParcelsNumber}
            parcelsNumber={parcelsNumber}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        )}
      </div>
    </>
  );
};
