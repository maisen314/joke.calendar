import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>2021</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Forside</Link>
          </li>
          <li>
            <Link to="/svarskjema">Svarskjema</Link>
          </li>
          <li>
            <Link to="/praktisk-informasjon">Praktisk informasjon</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
