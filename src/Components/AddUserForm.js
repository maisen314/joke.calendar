import classes from "./ResponseForm.module.css";
import { useRef } from "react";
import config from "../config.json"
import Card from "./Card";

function AddUserFrom(props) {
  const nameRef = useRef();
  const pwdRef = useRef();

  function tryAddUser(user) {
    fetch(
      `${config.FIREBASE_URL}users/username.json`
    )
      .then((response) => {
        return response?.json();
      })
      .then((data) => {
        if (data) {
          Object.keys(data).forEach((key) => {
            if (data[key]?.username === user.username) {
              throw new Error("Brukernavnet er opptatt");
            }
          });
        }
        return props.onAddedUser(user);
      })
      .catch(
        (err) => (document.getElementById("error").innerHTML = err.message)
      );
  }

  function submitHandler(event) {
    event.preventDefault();

    const submittedUser = {
      username: nameRef.current.value,
      password: pwdRef.current.value,
      submittedAt: new Date(),
    };
    try {
      tryAddUser(submittedUser);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <h3>Velg brukernavn og passord</h3>
        <div className={classes.control}>
          <input
            type="text"
            id="name"
            required
            ref={nameRef}
            placeholder="Brukernavn"
          />
        </div>
        <div className={classes.control}>
          <input
            type="password"
            id="password"
            required
            ref={pwdRef}
            placeholder="Passord"
          />
        </div>
        <div id="error"> </div>
        <div className={classes.actions}>
          <button>Send inn</button>
        </div>
      </form>
    </Card>
  );
}

export default AddUserFrom;
