import { useState, useEffect } from "react";
import Card from "../Components/Card";
import config from "../config.json";

function Highscore() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch(
      `${config.FIREBASE_URL}score.json`
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
      <Card>
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
      </Card>
    </div>
  );
}

export default Highscore;
