import { Route, Routes } from "react-router-dom";
import "./App.css";
import FrontPage from "./Pages/FrontPage";
import ResponsePage from "./Pages/ResponsePage";
import PracticalInformationPage from "./Pages/PracticalInformationPage";
import ThankYouPage from "./Pages/ThankYouPage";
import AdminPage from "./Pages/AdminPage";
import LoginPage from "./Pages/LoginPage";
import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <div>
      <Layout />
      <Routes>
        <Route path="/" exact element={<FrontPage />} />

        <Route path="/svarskjema" element={<ResponsePage />} />
        <Route
          path="/praktisk-informasjon"
          element={<PracticalInformationPage />}
        />
        <Route path="/takk" element={<ThankYouPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
