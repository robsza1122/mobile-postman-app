export const date = () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const dateStr = `Date: ${today.getFullYear()}-${
    currentMonth.toString().length === 1 ? "0" : ""
  }${currentMonth}-${
    today.getDate().toString().length === 1 ? "0" : ""
  }${today.getDate()} Hour: ${
    today.getHours().toString().length === 1 ? "0" : ""
  }${today.getHours()}-${
    today.getMinutes().toString().length === 1 ? "0" : ""
  }${today.getMinutes()}-${
    today.getSeconds().toString().length === 1 ? "0" : ""
  }${today.getSeconds()}`;

  return {
    dateStr,
  };
};
