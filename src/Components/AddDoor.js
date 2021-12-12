import AddDoorForm from "./AddDoorForm";
import { useNavigate } from "react-router-dom";
import config from "../config.json"

function AddDoor() {
  const navigate = useNavigate();

  function addDoor(door) {
    fetch(
      `${config.FIREBASE_URL}doorsQnA/${door.id}/qna.json`,
      {
        method: "POST",
        body: JSON.stringify(door),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(
        fetch(
          `${config.FIREBASE_URL}doorsQ/${door.id}.json`,
          {
            method: "POST",
            body: JSON.stringify({ question: door.question }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      )
      .then(
        fetch(
          `${config.FIREBASE_URL}doorIds/${door.id}.json`,
          {
            method: "POST",
            body: JSON.stringify(door.id),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      )
      .then(navigate("/takk"));
  }

  return (
    <div>
      <section>
        <AddDoorForm onAddedQnA={addDoor} />
      </section>
    </div>
  );
}

export default AddDoor;
