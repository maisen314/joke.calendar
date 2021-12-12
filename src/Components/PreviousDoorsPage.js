import { useState, useEffect } from "react";
import Card from "../Components/Card";
import config from "../config.json";
import img1 from "../img/1desember.jpeg";
import img2 from "../img/2desember.jpeg";
import img3 from "../img/3desember.jpeg";
import img4 from "../img/4desember.jpeg";

function Question({ id, door }) {
  const [visible, setVisible] = useState(false);
  const [qna, setQna] = useState({});

  useEffect(() => {
    console.log(id);
    fetch(
      `${config.FIREBASE_URL}doorsQnA/${id}.json`
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
  }, [id]);
  function StringOrImg(props) {
    if (qna.question === "Rebus1") {
      return (
        <div id="question">
          <img alt="rebus 1" src={img1} width="100%"></img>
        </div>
      );
    } else if (qna.question === "Rebus2") {
      return (
        <div id="question">
          <img alt="rebus 2" src={img2} width="100%"></img>
        </div>
      );
    } else if (qna.question === "Rebus3") {
      return (
        <div id="question">
          <img alt="rebus 3" src={img3} width="100%"></img>
        </div>
      );
    } else if (qna.question === "Rebus4") {
      return (
        <div id="question">
          <img alt="rebus 4" src={img4} width="100%"></img>
        </div>
      );
    } else {
      return <div id="question">{qna.question}</div>;
    }
  }
  return (
    <Card key={id}>
      <h2>Luke {door}</h2>
      <StringOrImg />
      {visible && <div>{qna.answer}</div>}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Skjul svar" : "Vis svar"}
      </button>
    </Card>
  );
}

function PreviousDoorsPage() {
  const [idList, setIdList] = useState([]);
  useEffect(() => {
    fetch(
      `${config.FIREBASE_URL}openedDoors.json`
    )
      .then((response) => {
        return response?.json();
      })
      .then((data) => {
        if (data) {
          console.log(data);
          var filteredData = data.filter((x) => x);
          filteredData.pop();
          var prevQuestionsObj = Object.keys(filteredData);
          var qObj = prevQuestionsObj.map((x) => {
            return {
              question: filteredData[x].question,
              door: parseInt(x) + 1,
            };
          });
          var ids = qObj.map((x) => {
            var key = Object.keys(x.question);
            return { id: x.question[key[0]].id, door: x.door };
          });
          setIdList(ids.reverse());
        }
      });
  }, []);
  return idList.map((x) => <Question key={x.id} id={x.id} door={x.door} />);
}

export default PreviousDoorsPage;
