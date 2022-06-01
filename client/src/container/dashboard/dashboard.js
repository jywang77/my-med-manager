import "./dashboard.css";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Today } from "../../components/dashboard/today";
import { Reminder } from "../../components/dashboard/reminder";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <NavBar />
      <Today />
      <Reminder />
    </div>
  );
};
