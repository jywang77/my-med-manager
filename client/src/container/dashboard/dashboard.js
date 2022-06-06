import "./dashboard.css";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Today } from "../../components/dashboard/today";
import { Reminder } from "../../components/dashboard/reminder";
import { Helmet } from "react-helmet";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <Helmet>
        <title>myMedManager - Dashboard</title>
      </Helmet>
      <NavBar />
      <Today />
      <Reminder />
    </div>
  );
};
