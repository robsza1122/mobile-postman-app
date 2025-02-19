import { Route, Routes } from "react-router-dom";
import { MainPage } from "./Pages/MainPage/MainPage.jsx";
import { CheckStatus } from "./Pages/CheckStatus/CheckStatus.jsx";
import { LoginPage } from "./Pages/LoginPage/LoginPage.jsx";
import React from "react";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/getCheckStatus/:number" element={<CheckStatus />} />
      <Route path="/login" element={<LoginPage />} /> 
    </Routes>
  )
}