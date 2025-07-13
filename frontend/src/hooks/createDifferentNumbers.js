function makeDifferentNumbers(length) {
  let result = "";
  let versionSystem = "";
  let numberOfDeliveryBook = "";
  const charactersForVersion =
    ".ABC.DE.FGHI.123456789.0123456789.80JKLMN.O.PQRSTU.VWX.YZ";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charaktersForDeliveryBook = "0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  let counterVersion = 0;
  let numberOfBook = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  while (counterVersion < length) {
    versionSystem += charactersForVersion.charAt(
      Math.floor(Math.random() * charactersLength),
    );
    counterVersion += 1;
  }
  while (numberOfBook < length) {
    numberOfDeliveryBook += charaktersForDeliveryBook.charAt(
      Math.floor(Math.random() * 10),
    );
    numberOfBook += 1;
  }
  return {
    result,
    versionSystem,
    numberOfDeliveryBook,
  };
}

export default makeDifferentNumbers;
