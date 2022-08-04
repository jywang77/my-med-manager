import "../home/right.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const RightCreate = () => {
  // storing information entered into create account form
  const [createUser, setCreateUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  function handle(e) {
    const handleCreateUser = { ...createUser };
    handleCreateUser[e.target.id] = e.target.value;
    setCreateUser(handleCreateUser);
  }

  // confirm password
  const [matchPassword, setMatchPassword] = useState(true);

  useEffect(() => {
    if (createUser.password === createUser.password2) {
      setMatchPassword(true);
    } else {
      setMatchPassword(false);
    }
  }, [createUser]);

  // conditions for showing/hiding error messages
  const [uniqueUsername, setUniqueUsername] = useState(null);
  const [uniqueEmail, setUniqueEmail] = useState(null);
  const [success, setSuccess] = useState(false);

  // redirect
  const navigate = useNavigate();

  // make sure form requirements are fulfilled before allowing you to submit the form
  function submit(e) {
    if (!matchPassword) {
      // displays error messages if passwords don't match
      e.preventDefault();
      document.querySelector(".confirmPassword").style.display = "block";
    } else {
      e.preventDefault();
      Axios({
        method: "POST",
        data: {
          username: createUser.username,
          email: createUser.email,
          password: createUser.password,
        },
        withCredentials: true,
        url: "http://localhost:3001/users/create",
      }).then((res) => {
        setUniqueUsername(res.data.uniqueUsername);
        setUniqueEmail(res.data.uniqueEmail);

        if (res.data === true) {
          setSuccess(res.data);

          setTimeout(() => navigate("/"), 1500);
        }
      });
    }
  }

  return (
    <div className="right">
      {/* form */}
      <form onSubmit={(e) => submit(e)}>
        <div>
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
            // recording info to send to back end
            onChange={(e) => handle(e)}
            id="username"
            value={createUser.username}
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
            required // recording info to send to back end
            onChange={(e) => handle(e)}
            id="email"
            value={createUser.email}
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
            value={createUser.password}
          />
        </div>
        <div>
          <p className="error confirmPassword">
            Error: Passwords do not match.
          </p>
          <p className="inputText">confirm password</p>
          <input
            className="input"
            type="password"
            placeholder="confirm password"
            required
            // recording info to send to back end
            onChange={(e) => handle(e)}
            id="password2"
            value={createUser.password2}
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
          Account created successfully. <br />
          Redirecting back to log in page...
        </p>
      </div>
    </div>
  );
};
