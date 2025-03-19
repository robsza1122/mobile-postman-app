import { Route, Routes, useNavigate } from "react-router-dom";
import { CheckStatus } from "./Pages/CheckStatus/CheckStatus.jsx";
import React, { useContext } from "react";
import { MainPage } from "./Pages/MainPage/MainPage.jsx";
import { PostmanContainer } from "./Components/PostmanContainer.jsx";
import { TrailOption } from "./Components/TrailOption/TrailOption.jsx";
import { setNavigate } from "./api/navigation.js";
import {LoginPage} from "./Pages/LoginPage/LoginPage.jsx"
import { BookList } from "./Components/BookList/BookList.jsx";
import { DeliverOption } from "./Components/DeliverOption/DeliverOption.jsx";
import { DeliveryCodeScreen } from "./Components/DeliveryCodeScreen/DeliveryCodeScreen.jsx";
import { PostManState } from "./PostGlobalProvider.jsx";
import { WorkPage } from "./Components/WorkPage/WorkPage.jsx";

export const App = () => {
  const navigate = useNavigate();
setNavigate(navigate);

const {downloadedBook} = useContext(PostManState);

const parcelsInDelivery = downloadedBook.filter(parcel => parcel.status[parcel.status.length - 1].name === "IN DELIVERY")
const advicedParcels = downloadedBook.filter(parcel => parcel.status[parcel.status.length - 1].name === "ADVICED")
const otherParcels = downloadedBook.filter(parcel => parcel.status[parcel.status.length - 1].name === "OTHERS")

  return (
    <Routes>
      <Route path="/getCheckStatus/:number" element={<CheckStatus />} />
      <Route path="/ML" element={<PostmanContainer/>} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/startTrail" element={<TrailOption />} />
      <Route path="/booklist" element={<BookList />} />
      <Route path="/workPage" element={<WorkPage />} />
      <Route path="/deliverOption" element={<DeliverOption parcelsToDeliver={parcelsInDelivery} advicedParcels={advicedParcels} otherParcels={otherParcels} />} />
      <Route path="/deliveryCodeScreen" element={<DeliveryCodeScreen />} />
    </Routes>
  ) 
}
