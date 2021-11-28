import AddUserFrom from "../Components/AddUserForm";
import { useNavigate } from "react-router-dom";


function AdminPage() {
    const navigate = useNavigate();
    function addUser(answer) {
        fetch(
          "https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/user.json",
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
            <h1>Opprett bruker</h1>
            <AddUserFrom onAddedUser={addUser} />
          </section>
        </div>
      );
}

export default AdminPage;