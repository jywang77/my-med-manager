import "./App.css";
import { Home } from "./container/home";
import { CreateAccount } from "./container/create-account";
import { Dashboard } from "./container/dashboard";
import { Calendar } from "./container/calendar";
import { MyMedications } from "./container/my-medications";
import { Settings } from "./container/settings";
import { NotFound } from "./container/not-found";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/my-medications" element={<MyMedications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
