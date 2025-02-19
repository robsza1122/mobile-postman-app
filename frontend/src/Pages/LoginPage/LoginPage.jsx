import React, { useState } from "react"
import { Navigation } from "../Navigation/Navigation";
import './LoginPage.scss';

export const LoginPage = () => {
    const [clickedButton, setClickedButton] = useState(false); 
    return (
        <>
        <Navigation />
        
        <div className="login__content">
        <form action="">
            <div className="login__field">
            <span className="login__text">
                Login:
            </span>
            <input
            type="text"
            className="login__input"  
            />
            </div>
            <div className="login__field">
            <span className="login__text">
                Password:
            </span>
            <input
            type="text"
            className="login__input"              
            />
            </div>
            <button 
            className="login__submit"
            onMouseDown={() => setClickedButton(true)}
            onMouseUp={() => setClickedButton(false)}
            onMouseLeave={() => setClickedButton(false)}
            style={{
              backgroundColor: `${clickedButton ? 'gray' : 'rgb(219, 29, 29)'}`,
            }}
            >Login</button>
            </form>
        </div>
        </>
    )
}