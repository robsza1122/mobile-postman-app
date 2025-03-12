import "./MyToolOption.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../api/api";
import useAuth from "../../hooks/useAuth";

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

    const { header, img, id } = option.option;

    const handleToolOptions = (optionsHeader) => {
      switch(optionsHeader) {
        case "LOGOUT":
          return () => signOut().then(data => data = undefined);
      }
    };

    const handleLinkOptions = (optionsHeader) => {
      switch(optionsHeader) {
        case "LOGOUT":
          return "/";
        case "START TRAIL WITH BOOK":
          return "/startTrail"
      }
    }

    return (
        <Link className="mytooloption__content" onClick={handleToolOptions(header)} to={handleLinkOptions(header)}>
            <h1 className="mytooloption__title">{header}</h1>
            <img 
            src={img} 
            alt={id} 
            className="mytooloption__image"
            />
        </Link>
    )
}