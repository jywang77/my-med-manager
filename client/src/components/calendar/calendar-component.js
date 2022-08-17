import "./calendar-component.css";
import { useState, useEffect } from "react";
import Axios from "axios";

export const CalendarComponent = () => {
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

  // sort medication into refill calendar
  const [refillCalendar, setRefillCalendar] = useState([]);
  useEffect(() => {
    setRefillCalendar([]);
    medArray.filter((med) => {
      if (med.refill === true) {
        return setRefillCalendar((old) => [...old, med]);
      } else return setRefillCalendar((old) => old);
    });
  }, [medArray]);

  // grab date info
  const [nav, setNav] = useState(0);
  const [monthDisplay, setMonthDisplay] = useState("");
  const [yearDisplay, setYearDisplay] = useState("");
  const [dateArray, setDateArray] = useState([]);
  const currentDate = new Date().getDate();

  useEffect(() => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    const date = new Date();

    if (nav !== 0) {
      date.setMonth(new Date().getMonth() + nav);
    }

    // const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
    setMonthDisplay(months[month]);
    setYearDisplay(year);

    const dateArr = [];
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      dateArr.push({
        value: i - paddingDays,
        date: new Date(year, month, i - paddingDays),
        meds: ["med1", "med2", "med3"],
        refills: ["refill1", "refill2"],
      });
    }
    setDateArray(dateArr);
  }, [medArray, refillCalendar, nav]);

  // show/hide different calendars
  const [medChecked, setMedChecked] = useState(false);
  const [refillChecked, setRefillChecked] = useState(true);

  return (
    <div className="background">
      <div className="toolbar">
        <div className="header">
          <button className="arrow prev" onClick={() => setNav(nav - 1)} />
          <div className="calendarHeader">
            <div className="monthDisplay">{monthDisplay}</div>
            <div className="yearDisplay">{yearDisplay}</div>
          </div>
          <button className="arrow next" onClick={() => setNav(nav + 1)} />
        </div>
        <div className="legend">
          <div className="calenders">
            <input
              type="checkbox"
              className="legendCheckbox"
              defaultChecked={medChecked}
              onChange={(e) => setMedChecked(e.target.checked)}
            />
            medications
          </div>
          <div className="calenders">
            <input
              type="checkbox"
              className="legendCheckbox redCheckbox"
              defaultChecked={refillChecked}
              onChange={(e) => setRefillChecked(e.target.checked)}
            />
            <span className="red">next refill</span>
          </div>
        </div>
      </div>
      <div className="calendar">
        <div className="weekdays">
          <div className="weekday">sun</div>
          <div className="weekday">mon</div>
          <div className="weekday">tues</div>
          <div className="weekday">wed</div>
          <div className="weekday">thurs</div>
          <div className="weekday">fri</div>
          <div className="weekday">sat</div>
        </div>
        <div className="tiles">
          {dateArray.map((d) => {
            return (
              <div className="spacingAid" key={d.date}>
                <div
                  className={
                    "tile" +
                    (d.value > 0 ? "" : " visibilityHide") +
                    (d.value === currentDate && nav === 0 ? " currentDay" : "")
                  }
                >
                  <div className="day">{d.value}</div>
                  <div className="eventContainer">
                    {d.meds.map((m, i) => {
                      return (
                        <div
                          className={"medEvent" + (medChecked ? "" : " hide")}
                          key={i}
                        >
                          {m}
                        </div>
                      );
                    })}
                    {d.refills.map((r, i) => {
                      return (
                        <div
                          className={
                            "refillEvent" + (refillChecked ? "" : " hide")
                          }
                          key={i}
                        >
                          {r}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
