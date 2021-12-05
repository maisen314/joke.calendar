import { useState, useEffect } from "react";
import Card from "../Components/Card";

function Question(props) {
  const [visible, setVisible] = useState(false);
  return (
    <Card>
      <h2>Luke {props.value.door}</h2>
      <div>{props.value.question}</div>
      {visible && <div>{props.value.answer}</div>}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Skjul svar" : "Vis svar"}
      </button>
    </Card>
  );
}

function PreviousDoorsPage() {
  const [qnaList, setQnaList] = useState([]);
  useEffect(() => {
    setQnaList([
      { door: 1, question: "Hvem er du", answer: "Ikke deg" },
      { door: 2, question: "Finn én feil: Hvem, hva, vors", answer: "hvor" },
    ]);
  }, []);
  return qnaList.map((qna) => (
    <Question
      value={{ door: qna.door, question: qna.question, answer: qna.answer }}
    />
  ));
}

export default PreviousDoorsPage;
