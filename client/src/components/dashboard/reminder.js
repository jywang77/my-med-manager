import "./reminder.css";
import img from "./dashboard.png";
import alert from "./alert.svg";
import { useState, useEffect } from "react";

export const Reminder = ({ medArray }) => {
  // filter medArray so that only the medications that require refill reminder are shown in reminderArray
  const [reminderArray, setReminderArray] = useState([]);

  useEffect(() => {
    setReminderArray([]);
    medArray.filter((med) => {
      const date0 = new Date(med.reminderDate2).setHours(0, 0, 0, 0);
      if (!med.reminderDate2) {
        return setReminderArray((old) => old);
      } else if (new Date().getTime() >= date0) {
        return setReminderArray((old) => [...old, med]);
      } else {
        return setReminderArray((old) => old);
      }
    });
  }, [medArray]);

  return (
    <div className="reminderContainer">
      <div className={"refill" + (reminderArray.length === 0 ? " hide" : "")}>
        <fieldset>
          <legend>
            <img className="alert" src={alert} alt="" />
            <span className="red"> refill </span>
            <img className="alert" src={alert} alt="" />
          </legend>
          {reminderArray.map((med) => {
            return (
              <div className="refillMed" key={med._id}>
                <input type="checkbox" />
                <label className="medLabel">
                  {med.medName} {med.dose}
                </label>
              </div>
            );
          })}
        </fieldset>
      </div>
      <div>
        <img className="dashboardPic" src={img} alt="" />
      </div>
    </div>
  );
};
