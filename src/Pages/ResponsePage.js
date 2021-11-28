import DoorWithResponse from "../Components/ResponseForm";
import { useNavigate, useParams } from "react-router-dom";

function ResponsePage() {
  const navigate = useNavigate();
  const {door} = useParams();
  function submitDoorHandler(answer) {
    fetch(
      "https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/test.json",
      {
        method: "POST",
        body: JSON.stringify(answer),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      navigate("/takk");
    });
  }
  return (
    <div>
      <section>
        <h1>Luke {door}</h1>
        <DoorWithResponse onSubmittedDoor={submitDoorHandler} />
      </section>
    </div>
  );
}

export default ResponsePage;
