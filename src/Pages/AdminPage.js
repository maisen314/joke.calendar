import AddUserFrom from "../Components/AddUserForm";
import { useNavigate } from "react-router-dom";


function AdminPage() {
    const navigate = useNavigate();
    function addUser(user){
      addUserWithPassword(user);
      addUsername({"username": user.username, "submittedAt": user.submittedAt});
    }

    function addUserWithPassword(userWithPassword) {
        fetch(
          "https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/userWithPassword.json",
          {
            method: "POST",
            body: JSON.stringify(userWithPassword),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      function addUsername(username) {
        fetch(
          "https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/username.json",
          {
            method: "POST",
            body: JSON.stringify(username),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(() => navigate("/takk"));
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