import ResponseForm from "../Components/ResponseForm";
import { useNavigate } from "react-router-dom";

function ResponsePage() {
  const navigate = useNavigate();
  function registerGuestHandler(guest) {
    fetch(
      "https://wedding-8dcb9-default-rtdb.europe-west1.firebasedatabase.app/guests.json",
      {
        method: "POST",
        body: JSON.stringify(guest),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      navigate.replace("/takk");
    });
  }
  return (
    <div>
      <section>
        <h1>Send inn ditt svar</h1>
        <ResponseForm onRegisterGuest={registerGuestHandler} />
      </section>
    </div>
  );
}

export default ResponsePage;
