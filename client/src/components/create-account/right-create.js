import "../home/right.css";
import { useState, useEffect } from "react";
import Axios from "axios";

export const RightCreate = () => {
  // grabbing information entered into create account form and sending to back end
  const createRoute = "http://localhost:3001/users/create";
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

  // make sure form requirements are fulfilled before allowing you to submit the form

  function submit(e) {
    if (!matchPassword) {
      e.preventDefault();
      document.querySelector(".err3").style.display = "block";
    } else {
      e.preventDefault();
      Axios.post(createRoute, {
        username: createUser.username,
        email: createUser.email,
        password: createUser.password,
      });
      // .then((res) => {
      //   console.log(res.createUser);
      // })
      // .catch((err) => {
      //   console.error(err.createUser);
      // });
    }
  }

  return (
    <div className="right">
      {/* form */}
      <form onSubmit={(e) => submit(e)}>
        <div>
          <p className="error err1">Error: Username already in use.</p>
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
          <p className="error err2">Error: Email already in use.</p>
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
          <p className="error err3">Error: Passwords do not match.</p>
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
      </div>
    </div>
  );
};
