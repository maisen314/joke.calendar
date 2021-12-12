import classes from "./ResponseForm.module.css";
import { useRef } from "react";

import Card from "./Card";

function AddDoorForm(props) {
  const qRef = useRef();
  const aRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const submittedQnA = {
      id: Math.floor(Math.random() * 1000),
      question: qRef.current.value,
      answer: aRef.current.value,
      submittedAt: new Date(),
    };
    try {
      props.onAddedQnA(submittedQnA);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <h3>Legg inn en ny luke</h3>
        <div className={classes.control}>
          <textarea
            type="text"
            id="question"
            required
            rows="5"
            ref={qRef}
            placeholder="Spørsmål"
          />
        </div>
        <div className={classes.control}>
          <textarea
            type="text"
            id="answer"
            rows="5"
            required
            ref={aRef}
            placeholder="Svar"
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

export default AddDoorForm;
