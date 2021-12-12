import { Route, Routes } from "react-router-dom";
import classes from "./App.module.scss";
import Highscore from "./Pages/Highscore";
import ResponsePage from "./Pages/ResponsePage";
import ThankYouPage from "./Pages/ThankYouPage";
import PreviousDoors from "./Pages/PreviousDoorsPage";
import NewUserPage from "./Pages/AddUserPage";
import AdminPage from "./Pages/AdminPage";
import AddDoor from "./Pages/AddDoor";
import Hamburger from "./Components/Layout/Hamburger";
import HackerPage from "./Pages/Hackerfaen";

function App() {
  return (
    <div className={classes.main} id="main">
      <Hamburger />
      <Routes>
        <Route path="/" exact element={<ResponsePage />} />
        <Route path="/highscore" exact element={<Highscore />} />
        <Route path="/takk" element={<ThankYouPage />} />
        <Route path="/fuckdeg" element={<HackerPage />} />
        <Route path="/tidligere-luker" element={<PreviousDoors />} />
        <Route path="/ny-bruker" element={<NewUserPage />} />
        <Route path="/legg-til-luke" element={<AddDoor />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
