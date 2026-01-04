  export const handleChoosingOptions = (options) => {
    switch (options) {
      case "Parcel postponed":
        return [
          "Addressee ordered delivery again",
          "Courier was not on time",
          "No one was at home",
        ];
      case "Lack of status":
        return ["Parcel lost"];
      case "Wrong address":
        return [
          "Parcel wrongly directed",
          "Parcel should be written to other courier",
        ];
      case "Delivered to ZDO":
        return [
          "Parcel delivered to boxmachine",
          "Parcel left in shop, ORLEN, ParcelPoint",
        ];
      case "Parcel undelivered to ZDO":
        return [
          "Parcel directed to post office",
          "Parcel wrongly directed",
          "Parcel undelivered from other reason",
        ];
      case "Parcel directed to office of undeliverable parcels":
        return ["Parcels adviced on post office from other reason"];
      case "Parcel returned to sender":
        return [
          "Addressee refused delivery",
          "Parcel is damaged",
          "Addressee moved out",
          "Addressee passed on",
          "Parcel returned from other reason",
          "Wrong address",
          "Parcel is impossible to delivery",
        ];
    }
  };