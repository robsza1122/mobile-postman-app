import "./Loading.scss";
import React from "react";

export const Loading = ({ message }: { message: string }) => {
  return (
    <>
      <div className="Loader__background"></div>
      <div className="Loader__window">
        <div className="Loader" />
        <p className="Loader__message">{message}</p>
      </div>
    </>
  );
};
