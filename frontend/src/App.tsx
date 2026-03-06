import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { CheckStatus } from "./Pages/CheckStatus/CheckStatus.tsx";
import { MainPage } from "./Pages/MainPage/MainPage.tsx";
import { PostmanContainer } from "./Components/PostmanContainer.tsx";
import { TrailOption } from "./Components/TrailOption/TrailOption.tsx";
import { setNavigate } from "./api/navigation.ts";
import { LoginPage } from "./Pages/LoginPage/LoginPage.tsx";
import { BookList } from "./Components/BookList/BookList.tsx";
import { StatusHandler } from "./Components/StatusHandler/StatusHandler.tsx";
import { DeliveryCodeScreen } from "./Components/DeliveryCodeScreen/DeliveryCodeScreen.tsx";
import { WorkPage } from "./Components/WorkPage/WorkPage.tsx";
import { PostGlobalProvider } from "./PostGlobalProvider.tsx";
import { TraditionalDeliver } from "./Components/TraditionalDeliver/TraditionalDeliver.tsx";
import { SignatureScreen } from "./Components/SignatureScreen/SignatureScreen.tsx";
import { AdvicedOption } from "./Components/AdvicedOption/AdvicedOption.tsx";
import { AdvicingScreen } from "./Components/AdvicingScreen/AdvicingScreen.jsx";
import { DeliverOption } from "./Components/DeliverOption/DeliverOption.tsx";
import { OtherOption } from "./Components/OtherOption/OtherOption.jsx";
import { OtherOptionScreen } from "./Components/OtherOptionScreen/OtherOptionScreen.tsx";
import { SettleWork } from "./Components/SettleWork/SettleWork.tsx";
import { ReorderList } from "./Components/ReorderList/ReorderList.tsx";
import { CreateBook } from "./Components/CreateBook/CreateBook.tsx";
import { MultiDeliveryVerification } from "./Components/MultiStatusVerification/MultiDeliveryVerification.tsx";
import { MultiAdvicingVerification } from "./Components/MultiStatusVerification/MultiAdvicingVerification.tsx";
import { MultiResultsVerification } from "./Components/MultiStatusVerification/MultiResultsVerification.tsx";

export const App = () => {
  const navigate = useNavigate();
  setNavigate(() => navigate);

  return (
    <PostGlobalProvider>
      <Routes>
        <Route path="/checkStatus/:id" element={<CheckStatus />} />
        <Route path="/" element={<PostmanContainer />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/startTrail" element={<TrailOption />} />
        <Route path="/booklist" element={<BookList />} />
        <Route path="/workPage" element={<WorkPage />} />
        <Route path="/statusHandler" element={<StatusHandler title="" firstButton="" secondButton="" firstButtonLink={() => ""} secondButtonLink={() => ""} onFirstButtonClick={() => { }} onSecondButtonClick={() => { }} />} />
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
        <Route
          path="/multiDeliveryVerification"
          element={<MultiDeliveryVerification />}
        />
        <Route
          path="/multiAdvicingVerification"
          element={<MultiAdvicingVerification />}
        />
        <Route path="/multiResultsVerification"
          element={<MultiResultsVerification />}
        />
        <Route path="*" element={<Navigate to="/workPage" replace />} />
      </Routes>
    </PostGlobalProvider>
  );
};
