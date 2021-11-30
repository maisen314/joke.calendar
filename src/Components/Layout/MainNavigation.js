import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const today = new Date();
  const door = today.getDate().toString();
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>Vitsekalender</Link>
      <nav>
        <ul>
          <li>
            <Link to={`/luke/${door}`}>Dagens luke</Link>
          </li>
          <li>
            <Link to="/tidligere-luker">Tidligere luker</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/legg-til-luke">Legg til spørsmål</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
