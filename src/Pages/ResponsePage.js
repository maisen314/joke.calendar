import DoorWithResponse from "../Components/ResponseForm";
import { useNavigate, useParams } from "react-router-dom";

function ResponsePage() {
  const navigate = useNavigate();
  const {door} = useParams();

  function checkPasswordAndSubmit(answer){
    const dbName = `${answer.password}${answer.username}`;
    fetch(`https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/${dbName}.json`)
            .then((response) => {
            return response?.json()
          }).then((data) => {
              if (data){
                submitDoorHandler(answer);
              } else{
                throw new Error("Brukernavn eller passord er feil");
              }
            }).catch((err) => {
              alert(err.message)
            })
              

  }

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
        <DoorWithResponse onSubmittedDoor={checkPasswordAndSubmit} />
      </section>
    </div>
  );
}

export default ResponsePage;
