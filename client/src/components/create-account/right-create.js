import "../home/right.css";
import { useState } from "react";
import Axios from "axios";

export const RightCreate = () => {
  // storing information entered into create account form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // conditions for showing/hiding error messages
  const [uniqueUsername, setUniqueUsername] = useState(null);
  const [uniqueEmail, setUniqueEmail] = useState(null);
  const [matchPassword, setMatchPassword] = useState(true);
  const [badUsername, setBadUsername] = useState(null);
  const [success, setSuccess] = useState(false);

  // make sure form requirements are fulfilled before allowing you to submit the form
  function submit(e) {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: username,
        email: email,
        password: password,
        password2: password2,
      },
      withCredentials: true,
      url: "/users/create",
    }).then((res) => {
      setUniqueUsername(res.data.uniqueUsername);
      setUniqueEmail(res.data.uniqueEmail);
      setMatchPassword(res.data.matchPassword);
      setBadUsername(res.data.badUsername);

      if (res.data === true) {
        setSuccess(res.data);
        setUsername("");
        setEmail("");
        setPassword("");
        setPassword2("");
        setUniqueEmail(null);
        setUniqueUsername(null);
        setMatchPassword(true);
        setBadUsername(false);
      }
    });
  }

  return (
    <div className="right">
      {/* form */}
      <form onSubmit={(e) => submit(e)}>
        <div>
          <p className={"error" + (badUsername ? " show" : "")}>
            Error: Username cannot contain spaces or special characters.
          </p>
          <p className={"error" + (uniqueUsername ? " show" : "")}>
            Error: Username already in use.
          </p>
          <p className="inputText">username</p>
          <input
            className="input"
            type="text"
            autoFocus
            placeholder="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            value={username}
          />
        </div>
        <div>
          <p className={"error" + (uniqueEmail ? " show" : "")}>
            Error: Email already in use.
          </p>
          <p className="inputText">email</p>
          <input
            className="input"
            type="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            value={email}
          />
        </div>
        <div>
          <p className="inputText">password</p>
          <input
            className="input"
            type="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            value={password}
          />
        </div>
        <div>
          <p className={"error" + (matchPassword ? "" : " show")}>
            Error: Passwords do not match.
          </p>
          <p className="inputText">confirm password</p>
          <input
            className="input"
            type="password"
            placeholder="confirm password"
            required
            onChange={(e) => setPassword2(e.target.value)}
            id="password2"
            value={password2}
          />
        </div>
        <button type="submit" className="button">
          create account
        </button>
      </form>
      <div>
        <a href="/">
          <button className="button2">back to log in</button>
        </a>
        <p className={"confirm" + (success ? " show" : "")}>
          Account created successfully.
        </p>
      </div>
    </div>
  );
};
