import "../home/right.css";

export const RightCreate = () => {
  return (
    <div className="right">
      {/* form */}
      <form>
        <div>
          <p class="error hidden">Error: Username already in use.</p>
          <input
            class="input"
            type="text"
            autoFocus
            placeholder="username"
            required
          />
        </div>
        <div>
          <p class="error hidden">Error: Email already in use.</p>
          <input class="input" type="email" placeholder="email" required />
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
          <p class="error hidden">Error: Passwords do not match.</p>
          <input
            class="input"
            type="password"
            placeholder="confirm password"
            required
          />
        </div>
      </form>
      <div>
        <button type="submit" class="button">
          create account
        </button>
      </div>
      <div>
        <a href="/">
          <button class="button">back to log in</button>
        </a>
      </div>
    </div>
  );
};
