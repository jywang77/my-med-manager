import "../dashboard/dashboard.css";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { CalendarComponent } from "../../components/calendar/calendar-component";
import { Helmet } from "react-helmet";

export const Calendar = () => {
  return (
    <div className="dashboard">
      <Helmet>
        <title>myMedManager - Calendar</title>
      </Helmet>
      <NavBar />
      <CalendarComponent />
    </div>
  );
};
