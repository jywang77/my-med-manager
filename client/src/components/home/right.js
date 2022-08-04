import "./right.css";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Right = () => {
  // storing information entered into login form (username and password)
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function handle(e) {
    const loginUser = { ...user };
    loginUser[e.target.id] = e.target.value;
    setUser(loginUser);
  }

  // show error message for incorrect username/password
  const [correctLogin, setCorrectLogin] = useState(true);

  // redirect
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: user.username,
        password: user.password,
      },
      withCredentials: true,
      url: "http://localhost:3001/users/login",
    }).then((res) => {
      setCorrectLogin(res.data);

      if (res.data === true) {
        navigate("/dashboard");
      }
    });
  }

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
            onChange={(e) => handle(e)}
            id="username"
            value={user.username}
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
            onChange={(e) => handle(e)}
            id="password"
            value={user.password}
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
