import { useContext, useEffect } from "react";
import "./DeliveryCodeScreen.scss";
import PinInput from "react-pin-input";
import { PostManState } from "../../PostGlobalProvider";
import { useNavigate } from "react-router-dom";
import useParcels, { PARCELS } from "../../hooks/useParcels";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addDeliveredStatus,
  handleFailedDeliveryCode,
  markAllOnFalse,
} from "../../api/api";
import { date } from "../../utils/currentDate";
import {
  deliverWithCodeQueryClient,
  deliveryWithCode,
  deliveryWithCodeLocally,
} from "../../utils/helpers/statusObjects";
import { CreateParcelOrder } from "../../types/parcel.type";

export const DeliveryCodeScreen = () => {
  const navigate = useNavigate();
  const {
    setDeliveryCode,
    currentUser,
    deliveryCode,
    downloadedParcels,
    setDownloadedParcels,
    setIsUpdatingParcel,
    setSavePoints,
  } = useContext(PostManState);
  const { parcels } = useParcels();
  const queryClient = useQueryClient();
  const { mutateAsync: asyncDeliveredStatus } = useMutation({
    mutationFn: addDeliveredStatus,
    mutationKey: [PARCELS],
    onMutate: async (updatedParcel: any) => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData({ queryKey: [PARCELS] });

      queryClient.setQueryData([PARCELS], (old: CreateParcelOrder[] = []) => {
        return old.map((parcel) => {
          const { dateStr } = date();
          if (parcel._id === updatedParcel._id) {
            return {
              ...parcel,
              isBooked: true,
              numberOfBook: updatedParcel.numberOfBook,
              isMarked: false,
              forUser: updatedParcel.forUser,
              isDeliveryCode: true,
              status: parcel.status ? [...parcel.status, deliverWithCodeQueryClient(dateStr)] : [deliverWithCodeQueryClient(dateStr)],
            };
          }

          return parcel;
        })
      },
      );

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

  const { mutate: failedDeliveryCode } = useMutation({
    mutationFn: handleFailedDeliveryCode,
    mutationKey: [PARCELS],
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData({ queryKey: [PARCELS] });

      queryClient.setQueryData([PARCELS], (old: CreateParcelOrder[] = []) =>
        old.map((parcel) => {
          if (updatedParcel.id === parcel._id) {
            return {
              ...parcel,
              amountOfTrials: (parcel.amountOfTrials ?? 0) + 1,
            };
          }

          return parcel;
        }),
      );

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

  const markedParcel = downloadedParcels.find((parcel) => parcel.isMarked);

  const { mutate: markAllOnFalsy } = useMutation({
    mutationFn: markAllOnFalse,
    mutationKey: [PARCELS],
  });

  useEffect(() => {
    window.onpopstate = () => {
      markAllOnFalsy();
    };
  }, []);

  const onDeliveryCode = (clickedParcel: CreateParcelOrder) => {
    const { dateStr } = date();
    if (
      clickedParcel.deliveryCode !== deliveryCode &&
      deliveryCode.length === (clickedParcel.deliveryCode ? clickedParcel.deliveryCode.length : 0) &&
      clickedParcel.amountOfTrials === 0
    ) {
      failedDeliveryCode({
        id: clickedParcel._id,
        amountOfTrials: 1,
      });
      alert("Wrong delivery code");
      setDeliveryCode("");
    }

    if (
      clickedParcel.deliveryCode !== deliveryCode &&
      deliveryCode.length === (clickedParcel.deliveryCode ? clickedParcel.deliveryCode.length : 0) &&
      clickedParcel.amountOfTrials === 1
    ) {
      failedDeliveryCode({
        id: clickedParcel._id,
        amountOfTrials: 2,
      });
      alert("Wrong delivery code");
      setDeliveryCode("");
    }

    if (
      clickedParcel.deliveryCode !== deliveryCode &&
      deliveryCode.length === (clickedParcel.deliveryCode ? clickedParcel.deliveryCode.length : 0) &&
      clickedParcel.amountOfTrials === 2
    ) {
      failedDeliveryCode({
        id: clickedParcel._id,
        amountOfTrials: 3,
      });
      alert("CODE DELIVERY IS BLOCKED");
      setDeliveryCode("");
      navigate("/traditionalDeliver");
    }

    if (clickedParcel.deliveryCode === deliveryCode) {
      setIsUpdatingParcel(true);
      asyncDeliveredStatus(
        deliveryWithCode({
          id: clickedParcel._id,
          date: dateStr,
          numberOfBook: clickedParcel.numberOfBook,
          username: currentUser.username,
        }),
      )
        .catch((err) => {
          console.error("addDeliveredStatus failed:", err);
        })
        .finally(() => {
          console.log("addDeliveredStatus settled");
          setIsUpdatingParcel(false);
          queryClient.invalidateQueries({ queryKey: [PARCELS] });
        });

      setDownloadedParcels(
        deliveryWithCodeLocally({ downloadedParcels, updatedParcel: clickedParcel, date: dateStr }),
      );

      navigate("/workPage");
    }

    if (deliveryCode === "") {
      setDeliveryCode("");
      alert("No delivery code is typed");

      return;
    }

    if (deliveryCode.length !== 6) {
      setDeliveryCode("");
      alert("Delivery code has 6 characters");

      return;
    }
    return;
  };

  return (
    <div className="dsc__content">
      <nav className="dsc__nav">
        <p className="dsc__text">Type Delivery Code</p>
        <p className="dsc__user">{`${currentUser.username} [${currentUser.EMINumber}]`}</p>
      </nav>
      <div className="dsc__body">
        <p className="dsc__number">{markedParcel?.numberOfParcel}</p>
        <p className="dsc__deliverytext">TYPE DELIVERY CODE</p>
        <p className="dsc__cashondelivery">
          Cash on delivery{" "}
          {!markedParcel?.amount.toString().includes(".")
            ? `${markedParcel?.amount}.00`
            : markedParcel?.amount}
        </p>
        <p className="dsc__trials">
          Amount of trials {markedParcel?.amountOfTrials} / 3
        </p>
        <PinInput
          style={{
            alignSelf: "center",
            margin: "50px auto",
          }}
          onChange={(e) => setDeliveryCode(e)}
          length={6}
          initialValue=""
          type="numeric"
          focus
        />
        <div className="dsc__buttons">
          <button
            className="dsc__button"
            onClick={() => {
              navigate("/traditionalDeliver");
              setSavePoints(null);
            }}
          >
            Deliver traditionally
          </button>
          <button
            className="dsc__button"
            onClick={() => onDeliveryCode(markedParcel === undefined ? {} as CreateParcelOrder : markedParcel)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
