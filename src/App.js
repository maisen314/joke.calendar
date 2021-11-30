import { Route, Routes } from "react-router-dom";
import "./App.css";
import FrontPage from "./Pages/FrontPage";
import ResponsePage from "./Pages/ResponsePage";
import ThankYouPage from "./Pages/ThankYouPage";
import PreviousDoors from "./Pages/PreviousDoorsPage";
import AdminPage from "./Pages/AdminPage";
import AddDoor from "./Pages/AddDoor";
import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <div>
      <Layout />
      <Routes>
        <Route path="/" exact element={<FrontPage />} />
        <Route path="/luke/:door" element={<ResponsePage />} />
        <Route path="/takk" element={<ThankYouPage />} />
        <Route path="/tidligere-luker" element={<PreviousDoors />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/legg-til-luke" element={<AddDoor />} />
      </Routes>
    </div>
  );
}

export default App;
