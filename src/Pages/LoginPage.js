import { useRef } from "react";

function LoginPage() {
  const username = useRef();
  const password = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const user = username.current.value;
    const pwd = password.current.value;
    if (user === "sjef" && pwd === "sjef1") {
      console.log("Jau");
    } else {
      console.log("nau");
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <input type="text" ref={username} />
      <input type="text" ref={password} />
      <button>Prøv</button>
    </form>
  );
}

export default LoginPage;
