import "./settings-component.css";
import { useState, useEffect } from "react";
import Axios from "axios";

export const SettingsComponent = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/users/user",
    }).then((res) => {
      if (res.data.name) {
        setName(res.data.name);
      } else {
        setName(res.data.username);
      }
      setUsername(res.data.username);
      setEmail(res.data.email);
    });
  }, []);

  // confirm password
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

  // make sure form requirements are fulfilled before allowing you to submit the form
  const handleSubmit = (e) => {
    if (!matchPassword) {
      e.preventDefault();
      document.querySelector(".err5").style.display = "block";
    }
  };

  return (
    <div className="background">
      <div className="settingsContainer">
        <div className="h4">settings</div>
        <div>
          <div className="h5">
            <span>name</span>
          </div>
          <div className="nameDescription">
            (Optional) Tell us your name or nickname. We will use this name to
            greet you on the dashboard. If no name is provided, we will use your
            username.
          </div>
          <div className="name">
            <div className="currentName">
              <div className="bold">Your current name: {name}</div>
              <div className="successMessage success1">
                Changed successfully.
              </div>
            </div>
            <div>
              <form>
                New name:
                <input
                  className="changeSettings"
                  type="text"
                  placeholder="enter new name here"
                  required
                />
                <button className="changeButton" type="submit">
                  change
                </button>
              </form>
            </div>
          </div>
          <div className="h5">
            <span>change username</span>
          </div>
          <div className="username">
            <div className="currentUsername">
              <div className="bold">Your current username: {username}</div>
              <div className="successMessage success2">
                Changed successfully.
              </div>
            </div>
            <div>
              <form>
                New username:
                <input
                  className="changeSettings"
                  type="text"
                  placeholder="enter new username here"
                  required
                />
                <button className="changeButton" type="submit">
                  change
                </button>
              </form>
            </div>
          </div>
          <div className="h5">
            <span>change password</span>
          </div>
          <div className="password">
            <form onSubmit={handleSubmit} className="passwordForm">
              <div>
                Current password:
                <input
                  className="changeSettings"
                  type="password"
                  placeholder="enter current password here"
                  required
                />
              </div>
              <div>
                New password:
                <input
                  className="changeSettings"
                  type="password"
                  placeholder="enter new password here"
                  onChange={setFirst}
                  required
                />
              </div>
              <div>
                Confirm new password:
                <input
                  className="changeSettings"
                  type="password"
                  placeholder="confirm new password here"
                  onChange={setSecond}
                  required
                />
              </div>
              <button className="changeButton" type="submit">
                change
              </button>
            </form>
            <div className="successMessage success3">Changed successfully.</div>
            <div className="error err5">Error: Passwords do not match.</div>
            <div className="error err7">
              Error: New password cannot be current password.
            </div>
          </div>
          <div className="h5">
            <span>change email</span>
          </div>
          <div>
            <form>
              <div className="bold">Your current email: {email}</div>
              <div>
                Confirm current email:
                <input
                  className="changeSettings"
                  type="email"
                  placeholder="enter current email here"
                  required
                />
              </div>
              <div>
                New email:
                <input
                  className="changeSettings"
                  type="email"
                  placeholder="enter new email here"
                  required
                />
              </div>
              <button className="changeButton" type="submit">
                change
              </button>
              <div className="successMessage success4">
                Changed successfully.
              </div>
              <div className="error err6">Error: Current email incorrect.</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
