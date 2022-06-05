import "./calendar-component.css";
import Calendar from "react-calendar";
import { useState } from "react";

export const CalendarComponent = () => {
  const [checked, setChecked] = useState(true);

  return (
    <div className="background">
      <div className="calendarContainer">
        <Calendar calendarType="US" showNeighboringMonth="false" />
      </div>
      <div className="legend">
        <div className="calenders">
          <input
            type="checkbox"
            className="legendCheckbox"
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
          />
          medications
        </div>
        <div className="calenders">
          <input
            type="checkbox"
            className="legendCheckbox redCheckbox"
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
          />
          <span className="red">refills</span>
        </div>
      </div>
    </div>
  );
};
