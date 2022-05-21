import "./right.css";

export const Right = () => {
  return (
    <div className="right">
      {/* form */}
      <form>
        <div>
          <p class="error hidden">Error: Username or password is incorrect.</p>
          <p class="confirm hidden">Account created successfully.</p>
          <input
            class="input"
            type="text"
            autoFocus
            placeholder="username"
            required
          />
        </div>
        <div>
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
          <button class="button">create account</button>
        </a>
      </div>
    </div>
  );
};
