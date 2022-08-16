import "./calendar-component.css";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Axios from "axios";

const localizer = momentLocalizer(moment);

export const CalendarComponent = () => {
  const [checked, setChecked] = useState(true);

  // grab user id from back end
  const [linkedUser, setLinkedUser] = useState("");

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/users/user",
    }).then((res) => {
      setLinkedUser(res.data._id.toString());
    });
  }, []);

  // use the user id to query all medications for user and place in array
  const [medArray, setMedArray] = useState([]);

  useEffect(() => {
    if (linkedUser) {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3001/meds/all/${linkedUser}`,
      }).then((res) => {
        setMedArray(res.data);
      });
    }
  }, [linkedUser]);

  console.log(medArray);

  const medications = [
    { start: new Date(), end: new Date(), title: "special event" },
  ];

  return (
    <div className="background">
      <div className="calendarContainer">
        <Calendar
          localizer={localizer}
          events={medications}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          views={["month"]}
          // components={{toolbar: CustomToolbar}}
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
