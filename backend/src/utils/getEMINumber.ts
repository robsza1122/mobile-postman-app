function makeEmiNumber(length: number) {
    let result = '';
    let versionSystem = '';
    const charactersForVersion = '.ABC.DE.FGHI.123456789.0123456789.80JKLMN.O.PQRSTU.VWX.YZ';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    let counterVersion = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    while (counterVersion < length) {
      versionSystem += charactersForVersion.charAt(Math.floor(Math.random() * charactersLength));
      counterVersion += 1;
    }
    return {
      result,
      versionSystem,
    }
};

export default makeEmiNumber;
