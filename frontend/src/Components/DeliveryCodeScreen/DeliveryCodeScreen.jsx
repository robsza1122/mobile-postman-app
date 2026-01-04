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
    onMutate: async (updatedParcel) => {
      await queryClient.cancelQueries({ queryKey: [PARCELS] });

      const previousParcels = queryClient.getQueriesData([PARCELS]);

      queryClient.setQueryData([PARCELS], (old) =>
        old.map((parcel) => {
          if (parcel.id === updatedParcel.id) {
            return {
              ...parcel,
              isBooked: true,
              numberOfBook: updatedParcel.numberOfBook,
              isMarked: false,
              forUser: updatedParcel.username,
              isDeliveryCode: true,
              status: parcel.status.push(deliverWithCodeQueryClient(date)),
            };
          }

          return parcel;
        }),
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

      const previousParcels = queryClient.getQueriesData([PARCELS]);

      queryClient.setQueryData([PARCELS], (old) =>
        old.map((parcel) => {
          if (updatedParcel.id === parcel.id) {
            return {
              ...parcel,
              amountOfTrials: parcel.amountOfTrials++,
            };
          }

          return parcel;
        }),
      );

      return { previousParcels };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [PARCELS] }),
  });

  const markedParcel = parcels.find((parcel) => parcel.isMarked);

  const { mutate: markAllOnFalsy } = useMutation({
    mutationFn: markAllOnFalse,
    mutationKey: [PARCELS],
  });

  useEffect(() => {
    window.onpopstate = () => {
      markAllOnFalsy();
    };
  }, []);

  const onDeliveryCode = (clickedParcel) => {
    if (
      clickedParcel.deliveryCode !== deliveryCode &&
      deliveryCode.length === clickedParcel.deliveryCode.length &&
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
      deliveryCode.length === clickedParcel.deliveryCode.length &&
      clickedParcel.amountOfTrials === 1
    ) {
      failedDeliveryCode({
        id: clickedParcel._id,
        amountOfTrials: 2,
      });
      alert("Wrong delivery code");
      setDeliveryCode("");
      triggerBackspaces(".pincode-input-text");
    }

    if (
      clickedParcel.deliveryCode !== deliveryCode &&
      deliveryCode.length === clickedParcel.deliveryCode.length &&
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
      asyncDeliveredStatus(deliveryWithCode(clickedParcel, date))
        .catch((err) => {
          console.error("addDeliveredStatus failed:", err);
        })
        .finally(() => {
          console.log("addDeliveredStatus settled");
          setIsUpdatingParcel(false);
          queryClient.invalidateQueries({ queryKey: [PARCELS] });
        });

      setDownloadedParcels(
        deliveryWithCodeLocally(downloadedParcels, clickedParcel, date),
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
  };

  console.log(parcels);

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
          className="dsc__pinsquare"
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
            onClick={() => onDeliveryCode(markedParcel)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
