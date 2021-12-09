import { Link } from "react-router-dom";
import { useState } from "react";
import classes from "./Hamburger.module.scss";

function Hamburger() {
  const [hamburgerClass, setHamburgerClass] = useState(classes.hamburger);
  const [navmenuClass, setNavmenuClass] = useState(classes.navmenu);
  const [open, setOpen] = useState(false);

  function toggle() {
    if (!open) {
      setHamburgerClass(classes.hamburger + " " + classes.active);
      setNavmenuClass(classes.navmenu + " " + classes.active);
      setOpen(true);
    } else {
      setHamburgerClass(classes.hamburger);
      setNavmenuClass(classes.navmenu);
      setOpen(false);
    }
  }
  return (
    <header>
      <nav className={classes.navbar}>
        <Link className={classes.navbranding} to="/">
          Vitsekalender
        </Link>
        <ul className={navmenuClass}>
          <li className={classes.navitem}>
            <Link to={`/highscore`} onClick={() => toggle()}>
              Highscore
            </Link>
          </li>
          <li className={classes.navitem}>
            <Link to={`/`} onClick={() => toggle()}>
              Dagens luke
            </Link>
          </li>
          <li className={classes.navitem}>
            <Link to="/tidligere-luker" onClick={() => toggle()}>
              Tidligere luker
            </Link>
          </li>
          <li className={classes.navitem}>
            <Link to="/legg-til-luke" onClick={() => toggle()}>
              Nytt spørsmål
            </Link>
          </li>
          <li className={classes.navitem}>
            <Link to="/ny-bruker" onClick={() => toggle()}>
              Ny bruker
            </Link>
          </li>
        </ul>
        <div className={hamburgerClass} onClick={() => toggle()}>
          <span className={classes.bar}></span>
          <span className={classes.bar}></span>
          <span className={classes.bar}></span>
        </div>
      </nav>
    </header>
  );
}

export default Hamburger;
