import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.scss";

function MainNavigation() {
  const today = new Date();
  const door = today.getDate().toString();
  return (
    <header className={classes.header}>
      <Link className={classes.logo} to="/">
        Vitsekalender
      </Link>
      <nav className={classes.navigationMenu}>
        <ul className={classes.internalNavigationLinks}>
          <li className={classes.listItem}>
            <Link to={`/luke/${door}`}>Dagens luke</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/tidligere-luker">Tidligere luker</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/ny-bruker">Ny bruker</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/legg-til-luke">Nytt spørsmål</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
