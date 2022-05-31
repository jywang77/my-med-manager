import "./App.css";
import { Home } from "./container/home/home";
import { CreateAccount } from "./container/create-account/create-account";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route
          path="/create-account"
          element={<CreateAccount></CreateAccount>}
        />
      </Routes>
    </div>
  );
}

export default App;
