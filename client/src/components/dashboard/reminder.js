import img from "./dashboard.png";
import "./reminder.css";
// importing today.css for checkbox formatting
import "./today.css";
import alert from "./alert.svg";

export const Reminder = () => {
  return (
    <div className="reminderContainer">
      <div className="refill">
        <fieldset>
          <legend>
            <img className="alert" src={alert} alt="" />
            <span className="red"> refill </span>
            <img className="alert" src={alert} alt="" />
          </legend>
          <div className="refillMed">
            <input type="checkbox" />
            <label>metformin 500mg</label>
          </div>
          <div className="refillMed">
            <input type="checkbox" />
            <label>zolpidem 10mg</label>
          </div>
        </fieldset>
      </div>
      <div>
        <img className="dashboardPic" src={img} alt="" />
      </div>
    </div>
  );
};
