import "./App.css";
import { Home } from "./container/home/home";
import { CreateAccount } from "./container/create-account/create-account";
import { Dashboard } from "./container/dashboard/dashboard";
import { Calendar } from "./container/calendar/calendar";
import { MyMedications } from "./container/my-medications/my-medications";
import { Settings } from "./container/settings/settings";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

function App() {
  // back end

  const [backendData, setBackendData] = useState([{}]);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBackendData(data);
  //     });
  // }, []);

  return (
    <div className="App">
      {/* {backendData.length > 0 ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )} */}

      {/* end of back end */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/my-medications" element={<MyMedications />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
