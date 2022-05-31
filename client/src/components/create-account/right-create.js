import "../home/right.css";
import { useState } from "react";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";

export const RightCreate = () => {
  // Confirm password

  const [password, setPassword] = useState({
    firstPassword: "",
    secondPassword: "",
  });

  const [match] = usePasswordValidation({
    firstPassword: password.firstPassword,
    secondPassword: password.secondPassword,
  });

  // const matchError = () => {
  //   const err3 = document.querySelector(".err3");

  //   if (match) {
  //     err3.style.display = "none";
  //   } else {
  //     err3.style.display = "block";
  //   }
  // };

  // function matchError(match) {
  //   document.querySelector(".err3").style.display = match ? "none" : "block";
  // }

  const setFirst = (event) => {
    setPassword({ ...password, firstPassword: event.target.value });
  };

  const setSecond = (event) => {
    setPassword({ ...password, secondPassword: event.target.value });
  };

  return (
    <div className="right">
      {/* form */}
      <form>
        <div>
          <p className="error hidden err1">Error: Username already in use.</p>
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
          <p className="error hidden err2">Error: Email already in use.</p>
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
          <p className="error hidden err3">Error: Passwords do not match.</p>
          {match ? <span>True</span> : <span>False</span>}
          <p className="inputText">confirm password</p>
          <input
            className="input"
            type="password"
            placeholder="confirm password"
            onChange={setSecond}
            required
          />
        </div>
      </form>
      <div>
        <button type="submit" className="button">
          create account
        </button>
      </div>
      <div>
        <a href="/">
          <button className="button2">back to log in</button>
        </a>
      </div>
    </div>
  );
};
