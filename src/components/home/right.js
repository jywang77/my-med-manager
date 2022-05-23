import "./right.css";

export const Right = ({ username, setUsername }) => {
  // const setMyUsername = (event) => {
  //   event.preventDefault();

  //   setUsername(event.target.value);
  // };

  return (
    <div className="right">
      {/* form */}
      <form>
        <div>
          <p class="error hidden">Error: Username or password is incorrect.</p>
          <p class="confirm hidden">Account created successfully.</p>
          <p class="inputText">username</p>
          <input
            class="input"
            type="text"
            autoFocus
            placeholder="username"
            // value={username}
            // onChange={setMyUsername}
            // onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div>
          <p class="inputText">password</p>
          <input
            class="input"
            type="password"
            placeholder="password"
            required
          />
        </div>
        <div>
          <button type="submit" class="button">
            log in
          </button>
        </div>
      </form>
      <div>
        <a href="create-account">
          <button class="button2">create account</button>
        </a>
      </div>
    </div>
  );
};
