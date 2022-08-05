import "./settings-component.css";
import { useState, useEffect } from "react";
import Axios from "axios";

export const SettingsComponent = () => {
  // grabbing and displaying current user information from back end
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/users/user",
    }).then((res) => {
      setId(res.data._id.toString());
      if (res.data.name) {
        setName(res.data.name);
      } else {
        setName(res.data.username);
      }
      setUsername(res.data.username);
      setEmail(res.data.email);
    });
  }, []);

  // storing information entered into form
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // confirm password
  const [matchPassword, setMatchPassword] = useState(true);

  useEffect(() => {
    if (newPassword === newPassword2) {
      setMatchPassword(true);
    } else {
      setMatchPassword(false);
    }
  }, [newPassword, newPassword2]);

  // change name button
  const handleSubmitName = async () => {
    await Axios({
      method: "PATCH",
      data: {
        name: newName,
      },
      withCredentials: true,
      url: `http://localhost:3001/users/change-name/${id}`,
    }).then((res) => {
      setName(res.data.name);

      // clears input
      setNewName("");

      // 'successfully changed name' message + fade away
      const s1 = document.querySelector(".s1");
      s1.style.visibility = "visible";
      s1.style.opacity = "1";
      s1.style.transition = "none";
      setTimeout(() => {
        s1.style.visibility = "hidden";
        s1.style.opacity = "0";
        s1.style.transition = "visibility 0s 1s, opacity 1s linear";
      }, 1000);
    });
  };

  // change username button

  // change password button
  const handleSubmitPassword = () => {
    if (!matchPassword) {
      // displays error messages if passwords don't match
      document.querySelector(".err5").style.display = "block";
    } else {
    }
  };

  // change email button

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
              <div className="bold yourName">Your current name: {name}</div>
              <div className="successMessage s1">Changed successfully.</div>
            </div>
            <div>
              New name:
              <input
                className="changeSettings"
                type="text"
                placeholder="enter new name here"
                // recording info to send to back end
                onChange={(e) => setNewName(e.target.value)}
                id="newName"
                value={newName}
              />
              <button
                className="changeButton"
                type="submit"
                onClick={handleSubmitName}
              >
                change
              </button>
            </div>
          </div>
          <div className="h5">
            <span>change username</span>
          </div>
          <div className="username">
            <div className="currentUsername">
              <div className="bold yourUsername">
                Your current username: {username}
              </div>
              <div className="successMessage">Changed successfully.</div>
              <div className="error">Error: Username already exists.</div>
            </div>
            <div>
              New username:
              <input
                className="changeSettings"
                type="text"
                placeholder="enter new username here"
                // recording info to send to back end
                onChange={(e) => setNewUsername(e.target.value)}
                id="newUsername"
                value={newUsername}
              />
              <button className="changeButton" type="submit">
                change
              </button>
            </div>
          </div>
          <div className="h5">
            <span>change password</span>
          </div>
          <div className="password">
            <div>
              Current password:
              <input
                className="changeSettings"
                type="password"
                placeholder="enter current password here"
                // recording info to send to back end
                onChange={(e) => setCurrentPassword(e.target.value)}
                id="currentPassword"
                value={currentPassword}
              />
            </div>
            <div>
              New password:
              <input
                className="changeSettings"
                type="password"
                placeholder="enter new password here"
                // recording info to send to back end
                onChange={(e) => setNewPassword(e.target.value)}
                id="newPassword"
                value={newPassword}
              />
            </div>
            <div>
              Confirm new password:
              <input
                className="changeSettings"
                type="password"
                placeholder="confirm new password here"
                // recording info to send to back end
                onChange={(e) => setNewPassword2(e.target.value)}
                id="newPassword2"
                value={newPassword2}
              />
            </div>
            <button
              className="changeButton"
              type="submit"
              onClick={handleSubmitPassword}
            >
              change
            </button>
            <div className="successMessage">Changed successfully.</div>
            <div className="error err5">Error: Passwords do not match.</div>
            <div className="error">
              Error: New password cannot be current password.
            </div>
          </div>
          <div className="h5">
            <span>change email</span>
          </div>
          <div>
            <div className="bold">Your current email: {email}</div>
            <div>
              New email:
              <input
                className="changeSettings"
                type="email"
                placeholder="enter new email here"
                // recording info to send to back end
                onChange={(e) => setNewEmail(e.target.value)}
                id="newEmail"
                value={newEmail}
              />
            </div>
            <button className="changeButton" type="submit">
              change
            </button>
            <div className="successMessage">Changed successfully.</div>
            <div className="error">Error: Email already exists.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
