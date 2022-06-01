import img from "./dashboard.png";
import "./reminder.css";
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
          <div className="refillMed">metformin 500mg</div>
          <div className="refillMed">zolpidem 10mg</div>
        </fieldset>
      </div>
      <div>
        <img className="dashboardPic" src={img} alt="" />
      </div>
    </div>
  );
};
