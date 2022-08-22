import "./dashboard.css";
import { NavBar } from "../components/nav-bar/nav-bar";
import { CalendarComponent } from "../components/calendar/calendar-component";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const Calendar = () => {
  return (
    <HelmetProvider>
      <div className="dashboard">
        <Helmet>
          <title>myMedManager - Calendar</title>
        </Helmet>
        <NavBar />
        <CalendarComponent />
      </div>
    </HelmetProvider>
  );
};
