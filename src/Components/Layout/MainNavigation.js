import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const today = new Date();
  const door = today.getDate().toString();
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Advent</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Oversikt</Link>
          </li>
          <li>
            <Link to={`/luke/${door}`}>Dagens luke</Link>
          </li>
          <li>
            <Link to="/tidligere-luker">Tidligere luker</Link>
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
