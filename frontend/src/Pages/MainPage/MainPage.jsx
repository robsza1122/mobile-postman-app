import React, { useState } from "react";
import { Navigation } from "../Navigation/Navigation.jsx";
import "./MainPage.scss";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const [clickedButton, setClickedButton] = useState(false);
  const userAgent = window.navigator.userAgent;
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
        <div className="mainpage__infos">
        <div className="mainpage__info">
        <p className="mainpage__text">User Agent:</p><p className="mainpage__data">{userAgent}</p>
        </div>
        <div className="mainpage__info">
        <p className="mainpage__text">Last logged:</p><p className="mainpage__data">ROBSZA</p>
        </div>
        </div>
      </div>
    </div>
  );
};
