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
  const redirectUrl = location.state?.redirectUrl || "/";
  const {
    mutate: signIn,
    isError,
    isPending,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate(redirectUrl, {
        replace: true,
    });
    }
  });

  return (
    <>     
      {isPending && <Loading message="Loading ditionaries..." />}
        <>
        <Navigation />
        <div className="login__content">
            <form>
              <div className="login__field">
                <span className="login__text">Login:</span>
                <input
                  type="text"
                  className="login__input"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  autoComplete="username" />
              </div>
              {isError && <p>Invalid email or password</p>}
              <div className="login__field">
                <span className="login__text">Password:</span>
                <input
                  type="password"
                  className="login__input"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />
              </div>
              <button
                type="submit"
                className="login__submit"
                onMouseDown={() => setClickedButton(true)}
                onMouseUp={() => setClickedButton(false)}
                onMouseLeave={() => setClickedButton(false)}
                style={{
                  backgroundColor: `${clickedButton ? "gray" : "rgb(219, 29, 29)"}`,
                }}
                onClick={() => signIn({username, password})}
              >
                Login
              </button>
            </form>
          </div>
          </>
      )
    </>
  );
};
