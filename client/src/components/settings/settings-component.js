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
  const [changeUser, setChangeUser] = useState({
    newName: "",
    newUsername: "",
    currentPassword: "",
    newPassword: "",
    newPassword2: "",
    newEmail: "",
  });

  function handle(e) {
    const handleChangeUser = { ...changeUser };
    handleChangeUser[e.target.id] = e.target.value;
    setChangeUser(handleChangeUser);
  }

  // confirm password
  const [matchPassword, setMatchPassword] = useState(true);

  useEffect(() => {
    if (changeUser.newPassword === changeUser.newPassword2) {
      setMatchPassword(true);
    } else {
      setMatchPassword(false);
    }
  }, [changeUser]);

  // change name button
  const handleSubmitName = async (e) => {
    e.preventDefault();

    await Axios({
      method: "PATCH",
      data: {
        name: changeUser.newName,
      },
      withCredentials: true,
      url: `http://localhost:3001/users/change-name/${id}`,
    }).then((res) => {
      setName(res.data.name);

      // clears input
      document.getElementById("changeName").reset();

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
  const handleSubmitPassword = (e) => {
    if (!matchPassword) {
      // displays error messages if passwords don't match
      e.preventDefault();
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
              <form onSubmit={(e) => handleSubmitName(e)} id="changeName">
                New name:
                <input
                  className="changeSettings"
                  type="text"
                  placeholder="enter new name here"
                  // recording info to send to back end
                  onChange={(e) => handle(e)}
                  id="newName"
                  value={changeUser.newName}
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
              <div className="bold yourUsername">
                Your current username: {username}
              </div>
              <div className="successMessage">Changed successfully.</div>
              <div className="error">Error: Username already exists.</div>
            </div>
            <div>
              <form>
                New username:
                <input
                  className="changeSettings"
                  type="text"
                  placeholder="enter new username here"
                  // recording info to send to back end
                  onChange={(e) => handle(e)}
                  id="newUsername"
                  value={changeUser.newUsername}
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
            <form onSubmit={handleSubmitPassword} className="passwordForm">
              <div>
                Current password:
                <input
                  className="changeSettings"
                  type="password"
                  placeholder="enter current password here"
                  // recording info to send to back end
                  onChange={(e) => handle(e)}
                  id="currentPassword"
                  value={changeUser.currentPassword}
                />
              </div>
              <div>
                New password:
                <input
                  className="changeSettings"
                  type="password"
                  placeholder="enter new password here"
                  // recording info to send to back end
                  onChange={(e) => handle(e)}
                  id="newPassword"
                  value={changeUser.newPassword}
                />
              </div>
              <div>
                Confirm new password:
                <input
                  className="changeSettings"
                  type="password"
                  placeholder="confirm new password here"
                  // recording info to send to back end
                  onChange={(e) => handle(e)}
                  id="newPassword2"
                  value={changeUser.newPassword2}
                />
              </div>
              <button className="changeButton" type="submit">
                change
              </button>
            </form>
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
            <form>
              <div className="bold">Your current email: {email}</div>
              <div>
                New email:
                <input
                  className="changeSettings"
                  type="email"
                  placeholder="enter new email here"
                  // recording info to send to back end
                  onChange={(e) => handle(e)}
                  id="newEmail"
                  value={changeUser.newEmail}
                />
              </div>
              <button className="changeButton" type="submit">
                change
              </button>
              <div className="successMessage">Changed successfully.</div>
              <div className="error">Error: Email already exists.</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
