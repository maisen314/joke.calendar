import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./FrontPage.module.scss";

function FrontPage() {
  const today = new Date();
  const door = today.getDate().toString();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch(
      `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/score.json`
    )
      .then((response) => {
        return response?.json();
      })
      .then((data) => {
        if (data) {
          setUserData(data);
        }
      });
  }, []);
  var sortedUserList = [];
  for (var username in userData) {
    sortedUserList.push([username, userData[username]]);
  }
  sortedUserList.sort(function (a, b) {
    return b[1] - a[1];
  });
  return (
    <div>
      <section>
        <h1>Lenker for mobilvisning</h1>
        <ul className={classes.linklist}>
          <li>
            <Link to={`/luke/${door}`}>Dagens luke</Link>
          </li>
          <li>
            <Link to="/tidligere-luker">Tidligere luker</Link>
          </li>
          <li>
            <Link to="/ny-bruker">Ny bruker</Link>
          </li>
          <li>
            <Link to="/legg-til-luke">Nytt spørsmål</Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>Highscore</h2>

        {sortedUserList !== [] && (
          <table>
            <tbody>
              {sortedUserList.map((username) => (
                <tr key={username[0]}>
                  <td>{username[0]}</td>
                  <td>{username[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default FrontPage;
