import AddUserFrom from "../Components/AddUserForm";
import { Link, useNavigate } from "react-router-dom";
import config from "../config.json"
import classes from './AddUser.module.scss';

function AdminPage() {
  const navigate = useNavigate();
  function addUser(user) {
    addUserWithPassword(user);
    addUsername({ username: user.username, submittedAt: user.submittedAt });
  }

  function addUserWithPassword(userWithPassword) {
    const dbName = `${userWithPassword.password}${userWithPassword.username}`;
    fetch(
      `${config.FIREBASE_URL}users/${dbName}.json`,
      {
        method: "POST",
        body: JSON.stringify(userWithPassword),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  function addUsername(username) {
    fetch(
      `${config.FIREBASE_URL}users/username.json`,
      {
        method: "POST",
        body: JSON.stringify(username),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => navigate("/takk"));
  }
  return (
    <div>
      <section>
        <AddUserFrom onAddedUser={addUser} />
      </section>
      <Link to="/admin" className={classes.secretlink}>.</Link>
    </div>
  );
}

export default AdminPage;
