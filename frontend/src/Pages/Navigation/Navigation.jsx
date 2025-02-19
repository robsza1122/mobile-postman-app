import { useContext } from "react";
import { Loading } from "../../Loading/Loading.jsx";
import "./Navigation.scss";
import { PostManState } from "../../PostGlobalProvider";
import React from "react";

export const Navigation = () => {
    const {loading} = useContext(PostManState);
    return (
        <><nav className="Nav">
            <div className="Nav__image" />
            <h2 className="Nav__title">MOBILE POSTMAN</h2>
        </nav>{loading && <Loading />}</>
    )
}