import "./dashboard.css";
import { NavBar } from "../components/nav-bar/nav-bar";
import { CalendarComponent } from "../components/calendar/calendar-component";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";

export const Calendar = () => {
  // protect route
  const navigate = useNavigate();

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/users/isauth",
    }).then((res) => {
      if (res.data === false) {
        navigate("/");
      }
    });
  }, [navigate]);

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
