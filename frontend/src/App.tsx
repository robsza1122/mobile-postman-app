import { Route, Routes } from "react-router";
import "./App.scss";
import { MainPage } from "./Pages/MainPage/MainPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>

  )
}
