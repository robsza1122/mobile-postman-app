import React, { useState } from "react";
import { Navigation } from "../Navigation/Navigation";
import "./LoginPage.scss";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/api";
import { Loading } from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    mutate: signIn,
    isError,
    isPending,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/ML", {
        replace: true,
      })
    }
  });

  return (
    <>
      {isPending && <Loading message="Loading ditionaries..." />}
        <>
          <Navigation />
          <div className="login__content">
            <h1 className="login__title">Poczta Polska ADFS</h1>
            <p className="login__logintext">Login using your organisation account</p>
          {isError && <p className="login__errortext">Invalid email or password</p>}
            <div className="login__field">
              <input
                type="text"
                className="login__input"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                autoComplete="username"
                placeholder="your.username..."
              />
            </div>
        
            <div className="login__field">
              <input
                type="password"
                className="login__input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="password..."
              />
            </div>
            <div className="login__buttonblock">
            <button
              className="login__submit"
              onMouseDown={() => setClickedButton(true)}
              onMouseUp={() => setClickedButton(false)}
              onMouseLeave={() => setClickedButton(false)}
              style={{
                backgroundColor: `${
                  clickedButton ? "gray" : "blue"
                }`,
              }}
              onClick={() => {
                signIn({ username, password })
              }}
            >
              Login
            </button>
            </div>
          </div>
        </>
    </>
  );
};
