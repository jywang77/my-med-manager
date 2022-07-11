import "./right.css";
import Axios from "axios";
import { useState } from "react";

export const Right = () => {
  // grabbing information entered into login form (username and password) and sending to back end
  const loginRoute = "http://localhost:3001/users/login";
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function handle(e) {
    const loginUser = { ...user };
    loginUser[e.target.id] = e.target.value;
    setUser(loginUser);
  }

  function submit(e) {
    e.preventDefault();
    Axios.post(loginRoute, {
      username: user.username,
      password: user.password,
    });
    // .then((res) => {
    //   console.log(res.user);
    // })
    // .catch((err) => {
    //   console.error(err.user);
    // });
  }

  return (
    <div className="right">
      {/* form */}
      <form onSubmit={(e) => submit(e)}>
        <div>
          <p className="error err4">
            Error: Username or password is incorrect.
          </p>
          <p className="confirm success">Account created successfully.</p>
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
