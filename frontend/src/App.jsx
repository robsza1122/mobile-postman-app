import { Route, Routes, useNavigate } from "react-router-dom";
import { CheckStatus } from "./Pages/CheckStatus/CheckStatus.jsx";
import React from "react";
import { MainPage } from "./Pages/MainPage/MainPage.jsx";
import { PostmanContainer } from "./Components/PostmanContainer.jsx";
import { TrailOption } from "./Components/TrailOption/TrailOption.jsx";
import { setNavigate } from "./api/navigation.js";
import { LoginPage } from "./Pages/LoginPage/LoginPage.jsx"
import { BookList } from "./Components/BookList/BookList.jsx";
import { DeliverOption } from "./Components/DeliverOption/DeliverOption.jsx";
import { DeliveryCodeScreen } from "./Components/DeliveryCodeScreen/DeliveryCodeScreen.jsx";
import { WorkPage } from "./Components/WorkPage/WorkPage.jsx";
import { PostGlobalProvider } from "./PostGlobalProvider.jsx";
import { TraditionalDeliver } from "./Components/TraditionalDeliver/TraditionalDeliver.jsx";
import { SignatureScreen } from "./Components/SignatureScreen/SignatureScreen.jsx";
import { AdvicedOption } from "./Components/AdvicedOption/AdvicedOption.jsx";
import { AdvicingScreen } from "./Components/AdvicingScreen/AdvicingScreen.jsx";
import { OtherOption } from "./Components/OtherOption/OtherOption.jsx";
import { OtherOptionScreen } from "./Components/OtherOptionScreen/OtherOptionScreen.jsx";
import { SettleWork } from "./Components/SettleWork/SettleWork.jsx";
import { ReorderList } from "./Components/ReorderList/ReorderList.jsx";
import { CreateBook } from "./Components/CreateBook/CreateBook.jsx";
import { MultiDeliveryVerification } from "./Components/MultiDeliveryVerification/MultiDeliveryVerification.jsx";

export const App = () => {
  const navigate = useNavigate();
setNavigate(navigate);

  return (
    <PostGlobalProvider>
    <Routes>
      <Route path="/checkStatus/:id" element={<CheckStatus />} />
      <Route path="/ML" element={<PostmanContainer/>} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/startTrail" element={<TrailOption />} />
      <Route path="/booklist" element={<BookList />} />
      <Route path="/workPage" element={<WorkPage />} />
      <Route path="/deliverOption" element={<DeliverOption />} />
      <Route path="/advicedOption" element={<AdvicedOption />} />
      <Route path="/deliveryCodeScreen" element={<DeliveryCodeScreen />} />
      <Route path="/traditionalDeliver" element={<TraditionalDeliver />} />
      <Route path="/signatureScreen" element={<SignatureScreen />} />
      <Route path="/advicingScreen" element={<AdvicingScreen />} />
      <Route path="/otherOption" element={<OtherOption />} />
      <Route path="/otherOptionScreen" element={<OtherOptionScreen />} />
      <Route path="/settle" element={<SettleWork />} />
      <Route path="/reorderList" element={<ReorderList />} />
      <Route path="/createBook" element={<CreateBook />} />
      <Route path="/multiDeliveryVerification" element={<MultiDeliveryVerification />} />
    </Routes>
    </PostGlobalProvider>
  ); 
};
