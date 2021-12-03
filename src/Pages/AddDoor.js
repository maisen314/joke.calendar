import AddDoorForm from "../Components/AddDoorForm";
import { useNavigate } from "react-router-dom";

function AddDoor() {
  const navigate = useNavigate();

  function addDoor(door) {
    fetch(
      `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/doorsQnA/${door.id}/qna.json`,
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
          `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/doorsQ/${door.id}.json`,
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
          `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/doorIds/${door.id}.json`,
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
        <h1>Legg inn spørsmål og svar</h1>
        <AddDoorForm onAddedQnA={addDoor} />
      </section>
    </div>
  );
}

export default AddDoor;
