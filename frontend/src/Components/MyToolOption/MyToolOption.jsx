import { useState } from "react";
import "./MyToolOption.scss";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../api/api";

export const MyToolOption = (option) => {
    const {user} = useAuth();
    console.log(user);
    const navigate = useNavigate();
    const { mutate: signOut } = useMutation({
      mutationFn: logoutUser,
      onSuccess: () => {
        navigate("/", {
          replace: true,
        });
      }
    });
    const [getId, setGetId] = useState(1);

    const { header, img, id } = option.option; 
    console.log(getId);

    return (
        <Link className="mytooloption__content" onClick={header === "LOGOUT" && (() => signOut().then(data => data = undefined))}>
            <h1 className="mytooloption__title">{header}</h1>
            <img 
            src={img} 
            alt={id} 
            className="mytooloption__image"
            />
        </Link>
    )
}