import DoorWithResponse from "../Components/ResponseForm";
import { useNavigate } from "react-router-dom";
import config from "../config.json";

function ResponsePage() {
  const navigate = useNavigate();
  function checkPasswordAndSubmit(answer) {
    const dbName = `${answer.password}${answer.username}`;
    fetch(
      `${config.FIREBASE_URL}users/${dbName}.json`
    )
      .then((response) => {
        return response?.json();
      })
      .then((data) => {
        if (data) {
          submitDoorHandler(answer);
        } else {
          throw new Error("Brukernavn eller passord er feil");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function submitDoorHandler(answer) {
    const doorNo = answer.door;
    fetch(
      `${config.FIREBASE_URL}openedDoors/${doorNo}/answer.json`,
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
        <DoorWithResponse onSubmittedDoor={checkPasswordAndSubmit} />
      </section>
    </div>
  );
}

export default ResponsePage;
