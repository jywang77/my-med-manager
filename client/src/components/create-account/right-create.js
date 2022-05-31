import "../home/right.css";
import { useState, useEffect } from "react";

export const RightCreate = () => {
  // Confirm password

  const [password, setPassword] = useState({
    firstPassword: "",
    secondPassword: "",
  });

  const setFirst = (event) => {
    setPassword({ ...password, firstPassword: event.target.value });
  };

  const setSecond = (event) => {
    setPassword({ ...password, secondPassword: event.target.value });
  };

  const [matchPassword, setMatchPassword] = useState(true);

  useEffect(() => {
    if (password.firstPassword === password.secondPassword) {
      setMatchPassword(true);
    } else {
      setMatchPassword(false);
    }
  }, [password]);

  // Make sure form requirements are fulfilled before allowing you to submit the form
  const handleSubmit = (e) => {
    if (!matchPassword) {
      e.preventDefault();
      document.querySelector(".err3").style.display = "block";
    }
  };

  return (
    <div className="right">
      {/* form */}
      <form onSubmit={handleSubmit}>
        <div>
          <p className="error err1">Error: Username already in use.</p>
          <p className="inputText">username</p>
          <input
            className="input"
            type="text"
            autoFocus
            placeholder="username"
            required
          />
        </div>
        <div>
          <p className="error err2">Error: Email already in use.</p>
          <p className="inputText">email</p>
          <input className="input" type="email" placeholder="email" required />
        </div>
        <div>
          <p className="inputText">password</p>
          <input
            className="input"
            type="password"
            placeholder="password"
            onChange={setFirst}
            required
          />
        </div>
        <div>
          <p className="error err3">Error: Passwords do not match.</p>
          <p className="inputText">confirm password</p>
          <input
            className="input"
            type="password"
            placeholder="confirm password"
            onChange={setSecond}
            required
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
