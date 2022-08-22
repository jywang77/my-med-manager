import "./dashboard.css";
import { NavBar } from "../components/nav-bar/nav-bar";
import { Today } from "../components/dashboard/today";
import { Reminder } from "../components/dashboard/reminder";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import Axios from "axios";

export const Dashboard = ({ handleIsAuth }) => {
  // grab user id from back end
  const [linkedUser, setLinkedUser] = useState("");

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/users/user",
    }).then((res) => {
      setLinkedUser(res.data._id.toString());
    });
  }, []);

  // use the user id to query all medications for user and place in array
  const [medArray, setMedArray] = useState([]);

  useEffect(() => {
    if (linkedUser) {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3001/meds/all/${linkedUser}`,
      }).then((res) => {
        setMedArray(res.data);
      });
    }
  }, [linkedUser]);

  return (
    <HelmetProvider>
      <div className="dashboard">
        <Helmet>
          <title>myMedManager - Dashboard</title>
        </Helmet>
        <NavBar handleIsAuth={handleIsAuth} />
        <Today medArray={medArray} />
        <Reminder medArray={medArray} />
      </div>
    </HelmetProvider>
  );
};
