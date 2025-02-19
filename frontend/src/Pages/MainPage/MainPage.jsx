import React, { useState } from "react";
import { Navigation } from "../Navigation/Navigation.jsx";
import "./MainPage.scss";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const [clickedButton, setClickedButton] = useState(false);
  console.log(clickedButton)
  return (
    <div className="mainpage__content">
      <Navigation />
      <div className="mainpage__background">
        <Link 
        className="mainpage__login"
        onMouseDown={() => setClickedButton(true)}
        onMouseUp={() => setClickedButton(false)}
        onMouseLeave={() => setClickedButton(false)}
        style={{
          backgroundColor: `${clickedButton ? 'gray' : 'rgb(219, 29, 29)'}`,
        }}
        to="/login"
        >Login
        </Link>
      </div>
    </div>
  );
};
