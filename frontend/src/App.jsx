import { Route, Routes } from "react-router-dom";
import { CheckStatus } from "./Pages/CheckStatus/CheckStatus.jsx";
import React from "react";
import { MainPage } from "./Pages/MainPage/MainPage.jsx";
import { PostmanContainer } from "./Components/PostmanContainer.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/getCheckStatus/:number" element={<CheckStatus />} />
      <Route path="/login" element={<PostmanContainer />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  ) 
}