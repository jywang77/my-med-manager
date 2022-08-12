import "./calendar-component.css";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const medications = [
  { start: new Date(), end: new Date(), title: "special event" },
];

export const CalendarComponent = () => {
  const [checked, setChecked] = useState(true);

  return (
    <div className="background">
      <div className="calendarContainer">
        <Calendar
          localizer={localizer}
          events={medications}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
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
