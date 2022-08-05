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

  // conditions for showing/hiding error messages
  const [existingUsername, setExistingUsername] = useState(null);
  const [existingEmail, setExistingEmail] = useState(null);
  const [rightPassword, setRightPassword] = useState(null);
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

      // 'successfully changed' message + fade away
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
  const handleSubmitUsername = async () => {
    await Axios({
      method: "PATCH",
      data: {
        username: newUsername,
      },
      withCredentials: true,
      url: `http://localhost:3001/users/change-username/${id}`,
    }).then((res) => {
      // if existing username, show error message
      if (res.data === true) {
        setExistingUsername(res.data);

        setNewUsername("");
      } else {
        setUsername(res.data.username);
        setExistingUsername(false);

        setNewUsername("");

        // 'successfully changed' message + fade away
        const s2 = document.querySelector(".s2");
        s2.style.visibility = "visible";
        s2.style.opacity = "1";
        s2.style.transition = "none";
        setTimeout(() => {
          s2.style.visibility = "hidden";
          s2.style.opacity = "0";
          s2.style.transition = "visibility 0s 1s, opacity 1s linear";
        }, 1000);
      }
    });
  };

  // change password button
  const handleSubmitPassword = async () => {
    // displays error messages if passwords don't match
    if (!matchPassword) {
      document.querySelector(".err5").style.display = "block";
    } else {
      await Axios({
        method: "PATCH",
        data: {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        withCredentials: true,
        url: `http://localhost:3001/users/change-password/${id}`,
      }).then((res) => {
        // if current password incorrect, show error message
        if (res.data === false) {
          setRightPassword(res.data);

          setCurrentPassword("");
          setNewPassword("");
          setNewPassword2("");
        } else {
          setRightPassword(true);

          setCurrentPassword("");
          setNewPassword("");
          setNewPassword2("");

          // 'successfully changed' message + fade away
          const s3 = document.querySelector(".s3");
          s3.style.visibility = "visible";
          s3.style.opacity = "1";
          s3.style.transition = "none";
          setTimeout(() => {
            s3.style.visibility = "hidden";
            s3.style.opacity = "0";
            s3.style.transition = "visibility 0s 1s, opacity 1s linear";
          }, 1000);
        }
      });
    }
  };

  // change email button
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    await Axios({
      method: "PATCH",
      data: {
        email: newEmail,
      },
      withCredentials: true,
      url: `http://localhost:3001/users/change-email/${id}`,
    }).then((res) => {
      // if existing email, show error message
      if (res.data === true) {
        setExistingEmail(res.data);

        setNewEmail("");
      } else {
        setEmail(res.data.email);
        setExistingEmail(false);

        setNewEmail("");

        // 'successfully changed' message + fade away
        const s4 = document.querySelector(".s4");
        s4.style.visibility = "visible";
        s4.style.opacity = "1";
        s4.style.transition = "none";
        setTimeout(() => {
          s4.style.visibility = "hidden";
          s4.style.opacity = "0";
          s4.style.transition = "visibility 0s 1s, opacity 1s linear";
        }, 1000);
      }
    });
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
          <div className="horizontal">
            <div className="current">
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
          <div className="horizontal">
            <div className="current">
              <div className="bold">Your current username: {username}</div>
              <div className={"error" + (existingUsername ? " show" : "")}>
                Error: Username already exists.
              </div>
              <div className="successMessage s2">Changed successfully.</div>
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
              <button
                className="changeButton"
                type="submit"
                onClick={handleSubmitUsername}
              >
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
            <div className="error err5">Error: Passwords do not match.</div>
            <div className={"error" + (rightPassword ? "" : " show")}>
              Error: Current password incorrect.
            </div>
            <div className="successMessage s3">Changed successfully.</div>
          </div>
          <div className="h5">
            <span>change email</span>
          </div>
          <div className="horizontal">
            <div className="current">
              <div className="bold truncate">Your current email: {email}</div>
              <div className={"error" + (existingEmail ? " show" : "")}>
                Error: Email already exists.
              </div>
              <div className="successMessage s4">Changed successfully.</div>
            </div>
            <form onSubmit={(e) => handleSubmitEmail(e)}>
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
                <button className="changeButton" type="submit">
                  change
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
