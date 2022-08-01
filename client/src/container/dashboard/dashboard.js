import "./dashboard.css";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Today } from "../../components/dashboard/today";
import { Reminder } from "../../components/dashboard/reminder";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import axios from "axios";

export const Dashboard = () => {
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/users/current",
    }).then((res) => {
      if (res.data) {
        console.log("You are authenticated");
      } else {
        console.log("You are not authenticated");
      }
    });
  }, []);

  return (
    <HelmetProvider>
      <div className="dashboard">
        <Helmet>
          <title>myMedManager - Dashboard</title>
        </Helmet>
        <NavBar />
        <Today />
        <Reminder />
      </div>
    </HelmetProvider>
  );
};
