import "./App.css";
import { Home } from "./container/home";
import { CreateAccount } from "./container/create-account";
import { Dashboard } from "./container/dashboard";
import { Calendar } from "./container/calendar";
import { MyMedications } from "./container/my-medications";
import { Settings } from "./container/settings";
import { NotFound } from "./container/not-found";
import { Routes, Route, Navigate } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const handleIsAuth = (run) => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/users/isauth",
    }).then((res) => {
      setIsAuth(res.data);
      console.log(res.data);
    });
  };
  handleIsAuth();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            !isAuth ? (
              <Home handleIsAuth={handleIsAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/create-account"
          element={!isAuth ? <CreateAccount /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={
            isAuth ? (
              <Dashboard handleIsAuth={handleIsAuth} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/calendar"
          element={
            isAuth ? (
              <Calendar handleIsAuth={handleIsAuth} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/my-medications"
          element={
            isAuth ? (
              <MyMedications handleIsAuth={handleIsAuth} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuth ? (
              <Settings handleIsAuth={handleIsAuth} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
