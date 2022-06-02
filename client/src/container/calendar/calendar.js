import "../dashboard/dashboard.css";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { CalendarComponent } from "../../components/calendar/calendar-component";

export const Calendar = () => {
  return (
    <div className="dashboard">
      <NavBar />
      <CalendarComponent />
    </div>
  );
};
