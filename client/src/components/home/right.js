import "./right.css";

export const Right = ({ username, setUsername }) => {
  return (
    <div className="right">
      {/* form */}
      <form>
        <div>
          <p className="error err4">
            Error: Username or password is incorrect.
          </p>
          <p className="confirm success">Account created successfully.</p>
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
          <p className="inputText">password</p>
          <input
            className="input"
            type="password"
            placeholder="password"
            required
          />
        </div>
        <div>
          <button type="submit" className="button">
            log in
          </button>
        </div>
      </form>
      <div>
        <a href="create-account">
          <button className="button2">create account</button>
        </a>
      </div>
    </div>
  );
};
