import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.scss";

function Footer() {
  const today = new Date();
  const door = today.getDate().toString();
  return (
    <section className={classes.Footer}>
      <ul>
        <li>
          <Link to={`/luke/${door}`}>Dagens luke</Link>
        </li>
        <li>
          <Link to="/tidligere-luker">Tidligere luker</Link>
        </li>
        {/* <li>
            <Link to="/ny-bruker">Ny bruker</Link>
          </li> */}
        <li>
          <Link to="/legg-til-luke">Nytt spørsmål</Link>
        </li>
      </ul>
    </section>
  );
}

export default Footer;
