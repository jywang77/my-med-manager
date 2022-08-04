import "./App.css";
import { Home } from "./container/home/home";
import { CreateAccount } from "./container/create-account/create-account";
import { Dashboard } from "./container/dashboard/dashboard";
import { Calendar } from "./container/calendar/calendar";
import { MyMedications } from "./container/my-medications/my-medications";
import { Settings } from "./container/settings/settings";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/my-medications" element={<MyMedications />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
