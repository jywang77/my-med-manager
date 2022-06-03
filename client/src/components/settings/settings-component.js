import "./settings-component.css";

export const SettingsComponent = () => {
  const firstName = "demo";
  const username = "demo";
  const email = "demo@demo.com";

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
              <div className="bold">Your current name: {firstName}</div>
              <div className="successMessage">Changed successfully.</div>
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
              <div className="successMessage">Changed successfully.</div>
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
            <form>
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
                  required
                />
              </div>
              <div>
                Confirm new password:
                <input
                  className="changeSettings"
                  type="password"
                  placeholder="confirm new password here"
                  required
                />
              </div>
              <button className="changeButton" type="submit">
                change
              </button>
            </form>
            <div className="successMessage">Changed successfully.</div>
            <div className="error">Error: Passwords do not match.</div>
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
              <div className="successMessage">Changed successfully.</div>
              <div className="error">Error: Current email incorrect.</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
