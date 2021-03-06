import classes from "./ResponseForm.module.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config.json"
import img1 from "../img/1desember.jpeg";
import img2 from "../img/2desember.jpeg";
import img3 from "../img/3desember.jpeg";
import img4 from "../img/4desember.jpeg";

import Card from "./Card";


function ResponseForm(props) {
  const nameRef = useRef();
  const pwdRef = useRef();
  const messageRef = useRef();
  const questionRef = useRef();

  const [question, setQuestion] = useState("");
  const today = new Date();
  const door = today.getDate().toString();
  const isAdvent = today <= new Date().setDate(24);

  useEffect(() => {
    openDoor(door);
  }, [door]);

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
      `${config.FIREBASE_URL}openedDoors/${doorNo}/question.json`
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
            `${config.FIREBASE_URL}doorIds.json`
          )
            .then((response) => {
              return response?.json();
            })
            .then((data) => {
              if (data) {
                var keys = Object.keys(data);
                var randomId = keys[Math.floor(Math.random() * keys.length)];
                fetch(
                  `${config.FIREBASE_URL}doorsQ/${randomId}.json`
                )
                  .then((response) => {
                    return response?.json();
                  })
                  .then((data) => {
                    var keys = Object.keys(data);
                    var q = data[keys[0]].question;
                    setQuestion(q);
                    fetch(
                      `${config.FIREBASE_URL}openedDoors/${doorNo}/question.json`,
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
                      `${config.FIREBASE_URL}doorIds/${randomId}.json`,
                      {
                        method: "DELETE",
                      }
                    )
                  )
                  .catch((err) => {
                    setQuestion(err);
                  });
              } else {setQuestion("Tomt for sp??rsm??l :(")}
          });
        }
      }).catch((err) => setQuestion("Tomt for sp??rsm??l :("));
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
    } else if (question === "Rebus4") {
      return (
        <div id="question" ref={questionRef}>
          <img alt="rebus 4" src={img4} width="100%"></img>
        </div>
      );
    } else {
      return (
        <div id="question" ref={questionRef}>
          {question}
        </div>
      );
    }
  }

  return ( <div>
    {isAdvent && <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2>Dagens sp??rsm??l</h2>
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
    </Card>}
    {!isAdvent && 
    <div>
    <div>
      Advent er over. 
    </div>
    <div>
      <Link className={classes.lenke} to="/tidligere-sp??rsm??l" >Du kan se her fram til neste advent</Link>
    </div>
    </div>}
    </div>
  );
}

export default ResponseForm;
