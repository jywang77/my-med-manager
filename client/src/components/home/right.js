import "./right.css";
import Axios from "axios";
import { useState } from "react";

export const Right = ({ handleIsAuth }) => {
  // storing information entered into login form (username and password)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // show error message for incorrect username/password
  const [correctLogin, setCorrectLogin] = useState(true);

  // redirect
  const submit = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:3001/users/login",
    }).then((res) => {
      setCorrectLogin(res.data);

      if (res.data === true) {
        handleIsAuth();
      }
    });
  };

  return (
    <div className="right">
      {/* form */}
      <form onSubmit={(e) => submit(e)}>
        <div>
          <p className={"error" + (correctLogin ? "" : " show")}>
            Error: Username or password is incorrect.
          </p>
          <p className="inputText">username</p>
          <input
            className="input"
            type="text"
            autoFocus
            placeholder="username"
            required
            // recording info to send to back end
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            value={username}
          />
        </div>
        <div>
          <p className="inputText">password</p>
          <input
            className="input"
            type="password"
            placeholder="password"
            required
            // recording info to send to back end
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            value={password}
          />
        </div>
        <div>
          <button type="submit" className="button">
            log in
          </button>
        </div>
      </form>
      <div>
        <a href="create-account">
          <button className="button2">create account</button>
        </a>
      </div>
    </div>
  );
};
