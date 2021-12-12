import { Route, Routes } from "react-router-dom";
import classes from "./App.module.scss";
import Highscore from "./Components/Highscore";
import ResponsePage from "./Components/ResponsePage";
import ThankYouPage from "./Components/ThankYouPage";
import PreviousDoors from "./Components/PreviousDoorsPage";
import NewUserPage from "./Components/AddUserPage";
import AdminPage from "./Components/AdminPage";
import AddDoor from "./Components/AddDoor";
import Hamburger from "./Components/Layout/Hamburger";

function App() {
  return (
    <div className={classes.main} id="main">
      <Hamburger />
      <Routes>
        <Route path="/" exact element={<ResponsePage />} />
        <Route path="/highscore" exact element={<Highscore />} />
        <Route path="/takk" element={<ThankYouPage />} />
        <Route path="/tidligere-luker" element={<PreviousDoors />} />
        <Route path="/ny-bruker" element={<NewUserPage />} />
        <Route path="/legg-til-luke" element={<AddDoor />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
