import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./FrontPage.module.scss";

function FrontPage() {
  const today = new Date();
  const door = today.getDate().toString();
  const [userData, setUserData] = useState([]);
  //   { username: "bruker1", score: 0 },
  //   { username: "bruker2", score: 3 },
  // ]);
  useEffect(() => {
    fetch(
      `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/users/username.json`
    )
      .then((response) => {
        return response?.json();
      })
      .then((data) => {
        if (data) {
          var keys = Object.keys(data);
          setUserData(keys.map((x) => data[x].username));
        }
      });
  }, []);

  return (
    <div>
      <section>
        <h1>Lenker for mobilvisning</h1>
        <ul className={classes.linklist}>
          <li>
            <Link to={`/luke/${door}`}>Dagens luke</Link>
          </li>
          {/* <li>
            <Link to="/tidligere-luker">Tidligere luker</Link>
          </li> */}
          <li>
            <Link to="/ny-bruker">Ny bruker</Link>
          </li>
          <li>
            <Link to="/legg-til-luke">Nytt spørsmål</Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>Brukere</h2>
        <div>Highscoreliste - work in progress (ikke sortert etter poeng)</div>
        <ol>
          {userData.map((userData) => (
            <li key={userData}>{userData}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default FrontPage;
