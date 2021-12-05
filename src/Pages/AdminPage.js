import { useRef, useState } from "react";

function AdminPage() {
  const username = useRef();
  const password = useRef();
  const [loggedIn, setLoggedIn] = useState(false);
  const [users] = useState([
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
        <ul>
          {users.map((userData) => (
            <li key={userData.username}>{userData.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AdminPage;
