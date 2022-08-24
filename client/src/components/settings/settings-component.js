import "./settings-component.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const SettingsComponent = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // protect route
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "/users/isauth",
    }).then((res) => {
      if (res.data === false) {
        navigate("/");
      } else {
        // grabbing and displaying current user information from back end
        Axios({
          method: "GET",
          withCredentials: true,
          url: "/users/user",
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
      }
    });
  }, [navigate]);

  // storing information entered into form
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  // conditions for showing/hiding error messages
  const [existingUsername, setExistingUsername] = useState(null);
  const [badUsername, setBadUsername] = useState(null);
  const [existingEmail, setExistingEmail] = useState(null);
  const [rightPassword, setRightPassword] = useState(true);
  const [matchPassword, setMatchPassword] = useState(true);
  const [noPassword, setNoPassword] = useState(null);
  const [rightDeletePassword, setRightDeletePassword] = useState(true);

  // change name button
  const handleSubmitName = async () => {
    Axios({
      method: "PATCH",
      data: {
        name: newName,
      },
      withCredentials: true,
      url: `/users/change-name/${id}`,
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
    Axios({
      method: "PATCH",
      data: {
        username: newUsername,
      },
      withCredentials: true,
      url: `/users/change-username/${id}`,
    }).then((res) => {
      // if existing username, show error message
      if (res.data.existingUsername || res.data.badUsername) {
        setExistingUsername(res.data.existingUsername);
        setBadUsername(res.data.badUsername);
      } else {
        setUsername(res.data.username);
        setExistingUsername(false);
        setBadUsername(false);
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
    Axios({
      method: "PATCH",
      data: {
        currentPassword: currentPassword,
        newPassword: newPassword,
        newPassword2: newPassword2,
      },
      withCredentials: true,
      url: `/users/change-password/${id}`,
    }).then((res) => {
      setMatchPassword(res.data.matchPassword);
      setNoPassword(res.data.noPassword);

      if (res.data.rightPassword === false) {
        setRightPassword(false);
      }

      if (
        res.data.matchPassword === true &&
        res.data.noPassword === false &&
        res.data.rightPassword === true
      ) {
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
  };

  // change email button
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    Axios({
      method: "PATCH",
      data: {
        email: newEmail,
      },
      withCredentials: true,
      url: `/users/change-email/${id}`,
    }).then((res) => {
      // if existing email, show error message
      if (res.data === true) {
        setExistingEmail(res.data);
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

  // delete account
  const handleDeleteAccount = async () => {
    Axios({
      method: "DELETE",
      data: {
        password: deletePassword,
      },
      withCredentials: true,
      url: `/users/delete-account/${id}`,
    }).then((res) => {
      if (res.data === false) {
        setRightDeletePassword(res.data);
      }
      if (res.data === true) {
        navigate("/");
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
              <div className={"error" + (badUsername ? " show" : "")}>
                Error: Username cannot contain spaces or special characters.
              </div>
              <div className="successMessage s2">Changed successfully.</div>
            </div>
            <div>
              New username:
              <input
                className="changeSettings"
                type="text"
                placeholder="enter new username here"
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
            <div className={"error" + (matchPassword ? "" : " show")}>
              Error: New passwords do not match.
            </div>
            <div className={"error" + (rightPassword ? "" : " show")}>
              Error: Current password incorrect.
            </div>
            <div className={"error" + (noPassword ? " show" : "")}>
              Error: Password must be at least one character in length.
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
          <div className="h5">
            <span>delete account</span>
          </div>
          <div className="nameDescription">
            To confirm that you would like to delete your account, please enter
            your password below. If you are navigated back to the home page,
            then your account was successfully deleted.
          </div>
          <div>
            Password:
            <input
              className="changeSettings"
              type="password"
              placeholder="enter password here"
              onChange={(e) => setDeletePassword(e.target.value)}
              id="deletePassword"
              value={deletePassword}
            />
            <button
              className="changeButton"
              type="submit"
              onClick={handleDeleteAccount}
            >
              delete my account
            </button>
          </div>
          <div className={"error" + (rightDeletePassword ? "" : " show")}>
            Error: Incorrect password.
          </div>
        </div>
      </div>
    </div>
  );
};
