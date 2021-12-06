import classes from "./ResponseForm.module.css";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import img1 from "../img/1desember.jpeg";
import img2 from "../img/2desember.jpeg";
import img3 from "../img/3desember.jpeg";

import Card from "./Card";

function ResponseForm(props) {
  const navigate = useNavigate();
  const nameRef = useRef();
  const pwdRef = useRef();
  const messageRef = useRef();
  const questionRef = useRef();
  const { door } = useParams();
  const [question, setQuestion] = useState("");
  const today = new Date();
  const trueDoor = today.getDate().toString();

  useEffect(() => {
    if (trueDoor !== door) {
      navigate("/fuckdeg");
    } else {
      openDoor(door);
    }
  }, [door, trueDoor, navigate]);

  function submitHandler(event) {
    event.preventDefault();

    const submittedForm = {
      username: nameRef.current.value,
      password: pwdRef.current.value,
      answer: messageRef.current.value,
      question: questionRef.current.value,
      door: door,
      submittedAt: new Date(),
    };
    console.log(submittedForm);
    props.onSubmittedDoor(submittedForm);
  }

  function openDoor(doorNo) {
    fetch(
      `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/openedDoors/${doorNo}/question.json`
    )
      .then((response) => {
        return response?.json();
      })
      .then((data) => {
        if (data) {
          var keys = Object.keys(data);
          setQuestion(data[keys[0]].question);
        } else {
          fetch(
            `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/doorIds.json`
          )
            .then((response) => {
              return response?.json();
            })
            .then((data) => {
              var keys = Object.keys(data);
              var randomId = keys[Math.floor(Math.random() * keys.length)];
              fetch(
                `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/doorsQ/${randomId}.json`
              )
                .then((response) => {
                  return response?.json();
                })
                .then((data) => {
                  var keys = Object.keys(data);
                  var q = data[keys[0]].question;
                  setQuestion(q);
                  fetch(
                    `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/openedDoors/${doorNo}/question.json`,
                    {
                      method: "POST",
                      body: JSON.stringify({ question: q, id: randomId }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                })
                .then(
                  fetch(
                    `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/doorIds/${randomId}.json`,
                    {
                      method: "DELETE",
                    }
                  )
                )
                .catch((err) => {
                  setQuestion(err);
                });
            });
        }
      });
  }

  function Question(props) {
    if (question === "Rebus1") {
      return (
        <div id="question" ref={questionRef}>
          <img alt="rebus 1" src={img1} width="100%"></img>
        </div>
      );
    } else if (question === "Rebus2") {
      return (
        <div id="question" ref={questionRef}>
          <img alt="rebus 2" src={img2} width="100%"></img>
        </div>
      );
    } else if (question === "Rebus3") {
        return (
          <div id="question" ref={questionRef}>
            <img alt="rebus 3" src={img3} width="100%"></img>
          </div>
        );
    }
     else {
      return (
        <div id="question" ref={questionRef}>
          {question}
        </div>
      );
    }
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2>Dagens spørsmål</h2>
        <Question />
        <h3>Luke {door}</h3>
        <div className={classes.control}>
          <textarea
            id="message"
            rows="5"
            ref={messageRef}
            placeholder={`Skriv svaret her`}
          />
        </div>
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
        <div className={classes.actions}>
          <button>Send inn</button>
        </div>
      </form>
    </Card>
  );
}

export default ResponseForm;
