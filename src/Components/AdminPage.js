import { useRef, useState, useEffect } from "react";
import config from "../config.json";
import classes from './Admin.module.scss';

function AdminPage() {
  const username = useRef();
  const password = useRef();
  const doorNo = useRef();
  const [loggedIn, setLoggedIn] = useState(false);
  const [rerenderHack, setRerenderHack] = useState(false);
  const [door, setDoor] = useState("");
  const [qna, setQna] = useState({});
  const [userAnswers, setUserAnswers] = useState({});

  const [users, setUsers] = useState({});

  useEffect(() => {
    fetch(
      `${config.FIREBASE_URL}score.json`
    )
      .then((response) => {
        return response?.json();
      })
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    if (door !== "") {
      fetch(
        `${config.FIREBASE_URL}openedDoors/${door}.json`
      )
        .then((response) => {
          return response?.json();
        })
        .then((data) => {
          setUserAnswers(data.answer);
          const qkey = Object.keys(data.question);
          const qid = data.question[qkey[0]].id;
          fetch(
            `${config.FIREBASE_URL}doorsQnA/${qid}.json`
          )
            .then((response) => {
              return response?.json();
            })
            .then((data) => {
              if (data) {
                var keys = Object.keys(data.qna);
                setQna(data.qna[keys[0]]);
              }
            });
        });
    }
  }, [door]);

  function submitHandler(event) {
    event.preventDefault();
    const user = username.current.value;
    const pwd = password.current.value;
    if (user === "sjef" && pwd === "sjef1") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }

  function givePoints(username, maybeGive) {
    var tmpScore = users[username];
    if (maybeGive === "+") {
      tmpScore++;
    } else {
      tmpScore--;
    }

    users[username] = tmpScore;
    setUsers(users);
    setRerenderHack(!rerenderHack);
  }

  function setSetDoor(event) {
    event.preventDefault();

    const no = doorNo.current.value;
    setDoor(no);
  }

  function updateUsers(event) {
    event.preventDefault();
    fetch(
      `${config.FIREBASE_URL}score.json`,
      {
        method: "PATCH",
        body: JSON.stringify(users),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  function NotLoggedIn() {
    return (
      <form onSubmit={submitHandler}>
        <input type="text" ref={username} />
        <input type="password" ref={password} />
        <button>Prøv</button>
      </form>
    );
  }

  function LoggedIn() {
    const usernames = Object.keys(users);
    return (
      <div className={classes.admin}>
        <form onSubmit={setSetDoor}>
          <input type="text" ref={doorNo} />
          <div>Spørsmål</div>
          <pre id="questionP">{JSON.stringify(qna, null, 2)}</pre>
          <pre id="answers">{JSON.stringify(userAnswers, null, 2)}</pre>
          <button>butt</button>
        </form>
        <form onSubmit={updateUsers}>
          <table>
            <tbody>
              {usernames.map((username) => (
                <tr key={username}>
                  <td>
                    {username} {users[username]}{" "}
                  </td>
                  <td>
                    <button onClick={() => givePoints(username, "+")}>
                      +1
                    </button>
                    <button onClick={() => givePoints(username, "-")}>
                      -1
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button>Oppdater</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {!loggedIn && <NotLoggedIn />}
      {loggedIn && <LoggedIn />}
    </div>
  );
}

export default AdminPage;
