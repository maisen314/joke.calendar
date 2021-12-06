import { useRef, useState } from "react";

function AdminPage() {
  const username = useRef();
  const password = useRef();
  const doorNo = useRef();
  const [loggedIn, setLoggedIn] = useState(false);
  const [door] = useState("");

  const [users, setUsers] = useState([
    { username: "bruker1", score: 0 },
    { username: "bruker2", score: 3 },
  ]);
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

  function givePoints(user) {
    setUsers(...users, users[0].score++);
    console.log(users);
  }
  if (!loggedIn) {
    return (
      <form onSubmit={submitHandler}>
        <input type="text" ref={username} />
        <input type="password" ref={password} />
        <button>Prøv</button>
      </form>
    );
  } else {
    return (
      <div>
        <input type="text" ref={doorNo} />
        {doorNo !== "" && <div>Spørsmål fra luke {door}</div>}
        <ul>
          {users.map((userData) => (
            <li key={userData.username}>
              {userData.username} {userData.score}{" "}
              <button onClick={() => givePoints()}>Poeng</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AdminPage;
