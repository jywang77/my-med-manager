import "./calendar-component.css";
import { useState } from "react";
import Calendar from "react-calendar";

export const CalendarComponent = () => {
  return (
    <div className="background">
      <div className="calendarContainer">
        <Calendar />
      </div>
    </div>
  );
};
