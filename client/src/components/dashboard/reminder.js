import "./reminder.css";
import img from "./dashboard.png";
import alert from "./alert.svg";
import { useState, useEffect } from "react";
import Axios from "axios";

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

  // grab info of med when clicking checkbox
  const [med, setMed] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  const handleRefillDelete = () => {
    Axios({
      method: "PATCH",
      withCredentials: true,
      url: `http://localhost:3001/meds/delete-refill/${med._id}`,
    }).then((res) => {
      if (res.data === true) {
        setMed({});
        setShowDelete(false);
        window.location.reload();
      }
    });
  };

  return (
    <div className="reminderContainer">
      <div className={"refill" + (reminderArray.length === 0 ? " hide" : "")}>
        <fieldset>
          <legend>
            <img className="alert" src={alert} alt="" />
            <span className="red"> refill </span>
            <img className="alert" src={alert} alt="" />
          </legend>
          {reminderArray.map((medEntry) => {
            return (
              <div className="refillMed" key={medEntry._id}>
                <input
                  type="checkbox"
                  checked={med === medEntry}
                  onChange={() => {
                    setMed(medEntry);
                    setShowDelete(true);
                  }}
                />
                <label className="medLabel">
                  {medEntry.medName} {medEntry.dose}
                </label>
              </div>
            );
          })}
        </fieldset>
      </div>
      <div className={"deletePopup" + (showDelete ? "" : " visibilityHide")}>
        Are you sure you would like to remove{" "}
        <span style={{ fontWeight: "600", textDecoration: "underline" }}>
          {med.medName} {med.dose}
        </span>{" "}
        from your refill list?
        <div className="deletePopupButtons">
          <button
            className="noDelete"
            onClick={() => {
              setMed({});
              setShowDelete(false);
            }}
          >
            No, go back
          </button>
          <button className="yesDelete" onClick={handleRefillDelete}>
            Yes, remove
          </button>
        </div>
      </div>
      <div>
        <img className="dashboardPic" src={img} alt="" />
      </div>
    </div>
  );
};
